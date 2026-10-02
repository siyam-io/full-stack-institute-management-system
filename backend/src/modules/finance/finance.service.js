import * as feeRepo from "./fee.repository.js";
import * as paymentRepo from "./payment.repository.js";
import { serializeFee, serializePayment } from "../../core/utils/serialize.js";
import { mapPaymentInput, refId } from "../../core/utils/refId.js";
import AppError from "../../core/errors/AppError.js";
import prisma from "../../core/db/prisma.js";

// -- Fee Operations --
export const fetchCampusFees = async (queryParams, branchFilter) => {
  const { status, search } = queryParams;
  const where = {};
  if (branchFilter?.branch_id) where.branchId = branchFilter.branch_id;
  else if (branchFilter?.branch) where.branchId = branchFilter.branch;
  if (status && status !== "all") where.status = status;

  let fees = await feeRepo.findFeeMany(where);

  if (search) {
    const studentIds = new Set();
    const studentRows = await prisma.$queryRaw`
      SELECT s.id FROM "students" s
      JOIN "batches" bat ON bat.id = s.batch_id
      WHERE (LOWER(s.student_name) LIKE LOWER('%' || ${search} || '%')
        OR LOWER(s.student_id) LIKE LOWER('%' || ${search} || '%')
        OR LOWER(s.contact_number) LIKE LOWER('%' || ${search} || '%'))
        AND (CAST(${branchFilter?.branch_id || branchFilter?.branch || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchFilter?.branch_id || branchFilter?.branch} AS uuid))
    `;
    for (const row of studentRows) studentIds.add(row.id);
    fees = fees.filter((f) => studentIds.has(f.student_id));
  }

  return fees.map(serializeFee);
};

export const fetchStudentFinance = async (studentId, branchFilter) => {
  const feeWhere = { studentId };
  if (branchFilter?.branch_id) feeWhere.branchId = branchFilter.branch_id;
  else if (branchFilter?.branch) feeWhere.branchId = branchFilter.branch;
  const feeSummary = await feeRepo.findFeeFirst(feeWhere);
  if (!feeSummary) throw new AppError("Financial record not found or access denied.", 404);
  const transactions = await paymentRepo.findPaymentsByStudent(studentId, branchFilter?.branch_id || branchFilter?.branch);
  return { fee_summary: serializeFee(feeSummary), transactions: transactions.map(serializePayment) };
};

export const modifyFeeDiscount = async (feeId, newDiscount, userId, branchFilter) => {
  const where = { id: feeId };
  if (branchFilter?.branch_id) where.branchId = branchFilter.branch_id;
  else if (branchFilter?.branch) where.branchId = branchFilter.branch;
  const fee = await feeRepo.findFeeFirst(where);
  if (!fee) throw new AppError("Fee record not found or access denied.", 404);
  if (Number(fee.discount) === newDiscount) return { isUnchanged: true, fee: serializeFee(fee) };
  const newNetPayable = Number(fee.total_amount) - newDiscount;
  if (newNetPayable < Number(fee.paid_amount)) throw new AppError(`Cannot apply discount. Already paid ৳${fee.paid_amount}.`, 400);
  let newStatus = "UNPAID";
  if (Number(fee.paid_amount) >= newNetPayable) newStatus = "PAID";
  else if (Number(fee.paid_amount) > 0) newStatus = "PARTIALLY_PAID";

  const updatedFee = await prisma.$queryRaw`
    UPDATE "invoices"
    SET discount = ${newDiscount}, net_payable = ${newNetPayable}, status = ${newStatus}, updated_at = NOW()
    WHERE id = CAST(${feeId} AS uuid)
    RETURNING *
  `.then((r) => r[0]);

  await prisma.$executeRaw`
    INSERT INTO "discount_logs" (id, amount, reason, created_at, applied_by_id, invoice_id)
    VALUES (gen_random_uuid(), ${newDiscount - (Number(fee.discount) || 0)}, 'Discount adjusted', NOW(), CAST(${userId} AS uuid), CAST(${feeId} AS uuid))
  `;

  // Re-fetch with relations
  const refreshed = await feeRepo.findFeeFirst({ id: feeId });
  return { isUnchanged: false, fee: serializeFee(refreshed) };
};

// -- Payment Operations --
export const processPayment = async (paymentData, userId, branchFilter) => {
  return await prisma.$transaction(async (tx) => {
    const payAmt = Number(paymentData.amount);
    const feeId = refId(paymentData.fee_record) || paymentData.feeId;
    const branchVal = branchFilter?.branch_id || branchFilter?.branch || null;
    const feeRows = await tx.$queryRaw`
      SELECT f.* FROM "invoices" f
      JOIN "students" s ON s.id = f.student_id
      JOIN "batches" bat ON bat.id = s.batch_id
      WHERE f.id = CAST(${feeId} AS uuid)
      AND (CAST(${branchVal} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchVal} AS uuid))
      LIMIT 1
    `;
    const fee = feeRows[0];
    if (!fee) throw new AppError("Fee record not found or access denied.", 404);
    const remaining = Number(fee.net_payable) - Number(fee.paid_amount);
    if (payAmt > remaining) throw new AppError(`Overpayment error. Max due: ${remaining}`, 400);
    const receiptNumber = `RCPT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const paymentRows = await tx.$queryRaw`
      INSERT INTO "payments" (id, amount, payment_method, transaction_id,
        receipt_number, remarks, invoice_id, collected_by, updated_at)
      VALUES (gen_random_uuid(), ${payAmt}, ${paymentData.payment_method},
        ${paymentData.transaction_id || null}, ${receiptNumber}, ${paymentData.remarks || ""},
        CAST(${feeId} AS uuid), CAST(${userId} AS uuid), NOW())
      RETURNING *
    `;
    const insertedPayment = paymentRows[0];

    const newPaidAmount = Number(fee.paid_amount) + payAmt;
    const newStatus = newPaidAmount >= Number(fee.net_payable) ? "PAID" : "PARTIALLY_PAID";
    await tx.$executeRaw`
      UPDATE "invoices" SET paid_amount = ${newPaidAmount}, status = ${newStatus}, updated_at = NOW()
      WHERE id = CAST(${feeId} AS uuid)
    `;

    const updatedFeeRows = await tx.$queryRaw`
      SELECT f.*,
        json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id,
                          'photo_url', s.photo_url, 'contact_number', s.contact_number) AS student,
        json_build_object('id', c.id, 'course_name', c.course_name_en) AS course
      FROM "invoices" f
      JOIN "students" s ON s.id = f.student_id
      JOIN "batches" bat ON bat.id = s.batch_id
      JOIN "courses" c ON c.id = bat.course_id
      WHERE f.id = CAST(${feeId} AS uuid) LIMIT 1
    `;

    const refreshed = updatedFeeRows[0];
    if (refreshed?.student?.contact_number) {
      import("../../core/notifications/sms.service.js").then(({ sendPaymentReceiptSMS }) => {
        sendPaymentReceiptSMS({
          studentName: refreshed.student.student_name,
          amount: payAmt,
          receiptNumber,
          phone: refreshed.student.contact_number,
          dueAmount: Math.max(0, Number(fee.net_payable) - newPaidAmount),
        }).catch((err) => console.error("Payment Receipt SMS error:", err.message));
      });
    }

    return { payment: serializePayment(insertedPayment), fee_summary: serializeFee(refreshed) };
  });
};

export const fetchPaymentById = async (id) => {
  const payment = await paymentRepo.findPaymentById(id);
  if (!payment) throw new AppError("Payment not found", 404);
  return serializePayment(payment);
};
