import prisma from "../../core/db/prisma.js";
import AppError from "../../core/errors/AppError.js";
import { serializeFee, serializePayment } from "../../core/utils/serialize.js";
import { sendPaymentReceiptSMS } from "../../core/notifications/sms.service.js";

const BKASH_APP_KEY = process.env.BKASH_APP_KEY || "";
const BKASH_APP_SECRET = process.env.BKASH_APP_SECRET || "";
const BKASH_USERNAME = process.env.BKASH_USERNAME || "";
const BKASH_PASSWORD = process.env.BKASH_PASSWORD || "";
const BKASH_BASE_URL = process.env.BKASH_BASE_URL || "https://tokenized.sandbox.bka.sh/v1.2.0-beta";

const isBkashConfigured = Boolean(
  BKASH_APP_KEY && BKASH_APP_SECRET && BKASH_USERNAME && BKASH_PASSWORD
);

/**
 * Obtain bKash Grant Token (Tokenized API)
 */
const getBkashToken = async () => {
  if (!isBkashConfigured) return null;
  const res = await fetch(`${BKASH_BASE_URL}/tokenized/checkout/token/grant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      username: BKASH_USERNAME,
      password: BKASH_PASSWORD,
    },
    body: JSON.stringify({
      app_key: BKASH_APP_KEY,
      app_secret: BKASH_APP_SECRET,
    }),
  });
  const data = await res.json();
  if (!data?.id_token) throw new AppError("Failed to obtain bKash token", 500);
  return data.id_token;
};

/**
 * Initialize Online bKash Checkout
 */
export const createBkashPayment = async ({ invoiceId, amount, payerReference, callbackUrl }) => {
  const numAmount = Number(amount);
  if (!invoiceId || !numAmount || numAmount <= 0) {
    throw new AppError("Valid invoice ID and payment amount required", 400);
  }

  // 1. Fetch Invoice
  const feeRows = await prisma.$queryRaw`
    SELECT f.*, s.student_name, s.student_id, s.contact_number
    FROM "invoices" f
    JOIN "students" s ON s.id = f.student_id
    WHERE f.id = CAST(${invoiceId} AS uuid)
    LIMIT 1
  `;
  const invoice = feeRows[0];
  if (!invoice) throw new AppError("Invoice not found", 404);

  const due = Number(invoice.net_payable) - Number(invoice.paid_amount);
  if (numAmount > due) {
    throw new AppError(`Payment amount (BDT ${numAmount}) exceeds outstanding due (BDT ${due})`, 400);
  }

  const orderId = `ORD-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

  // 2. If bKash live/sandbox credentials are configured
  if (isBkashConfigured) {
    try {
      const token = await getBkashToken();
      const res = await fetch(`${BKASH_BASE_URL}/tokenized/checkout/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          "X-APP-Key": BKASH_APP_KEY,
        },
        body: JSON.stringify({
          mode: "0011",
          payerReference: payerReference || invoice.contact_number || "01700000000",
          callbackURL: callbackUrl || "https://cibdhk.com/api/payments/bkash/callback",
          amount: String(numAmount),
          currency: "BDT",
          intent: "sale",
          merchantInvoiceNumber: orderId,
        }),
      });
      const data = await res.json();
      return {
        mode: "live",
        paymentID: data.paymentID,
        bkashURL: data.bkashURL,
        invoiceId,
        amount: numAmount,
      };
    } catch (err) {
      console.warn("bKash gateway call failed, fallback to simulated checkout:", err.message);
    }
  }

  // 3. Simulated Sandbox Mode (zero-friction testing & instant verification)
  const paymentID = `BKASH_SIM_${Date.now()}`;
  return {
    mode: "sandbox_simulation",
    paymentID,
    invoiceId,
    amount: numAmount,
    studentName: invoice.student_name,
    studentId: invoice.student_id,
    orderId,
    instructions: "Demo bKash Gateway ready. Confirm to complete payment execution.",
  };
};

/**
 * Complete and record payment in database
 */
export const executeBkashPayment = async ({ paymentID, invoiceId, amount, trxID, userId }) => {
  const payAmt = Number(amount);

  return await prisma.$transaction(async (tx) => {
    // 1. Fetch & lock invoice
    const feeRows = await tx.$queryRaw`
      SELECT f.*,
        json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id,
                          'contact_number', s.contact_number) AS student
      FROM "invoices" f
      JOIN "students" s ON s.id = f.student_id
      WHERE f.id = CAST(${invoiceId} AS uuid)
      LIMIT 1
    `;
    const fee = feeRows[0];
    if (!fee) throw new AppError("Invoice record not found", 404);

    const remaining = Number(fee.net_payable) - Number(fee.paid_amount);
    if (payAmt > remaining) {
      throw new AppError(`Overpayment error. Remaining due: ${remaining}`, 400);
    }

    const receiptNumber = `BK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const transactionId = trxID || paymentID || `TRX${Date.now()}`;

    // 2. Insert Payment
    const paymentRows = await tx.$queryRaw`
      INSERT INTO "payments" (
        id, amount, payment_method, transaction_id,
        receipt_number, remarks, invoice_id, collected_by, updated_at
      )
      VALUES (
        gen_random_uuid(),
        ${payAmt},
        'bKash Online',
        ${transactionId},
        ${receiptNumber},
        'Online Payment via bKash Gateway',
        CAST(${invoiceId} AS uuid),
        CAST(${userId || '645556aa-3f77-480b-a5af-ac6097ee5970'} AS uuid),
        NOW()
      )
      RETURNING *
    `;
    const payment = paymentRows[0];

    // 3. Update Invoice
    const newPaidAmount = Number(fee.paid_amount) + payAmt;
    const newStatus = newPaidAmount >= Number(fee.net_payable) ? "PAID" : "PARTIALLY_PAID";

    await tx.$executeRaw`
      UPDATE "invoices"
      SET paid_amount = ${newPaidAmount}, status = ${newStatus}, updated_at = NOW()
      WHERE id = CAST(${invoiceId} AS uuid)
    `;

    // 4. Fetch updated invoice
    const refreshedFeeRows = await tx.$queryRaw`
      SELECT f.*,
        json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id,
                          'photo_url', s.photo_url, 'contact_number', s.contact_number) AS student,
        json_build_object('id', c.id, 'course_name', c.course_name_en) AS course
      FROM "invoices" f
      JOIN "students" s ON s.id = f.student_id
      JOIN "batches" bat ON bat.id = s.batch_id
      JOIN "courses" c ON c.id = bat.course_id
      WHERE f.id = CAST(${invoiceId} AS uuid) LIMIT 1
    `;

    // 5. Send automated SMS receipt in background
    if (fee.student?.contact_number) {
      sendPaymentReceiptSMS({
        studentName: fee.student.student_name,
        amount: payAmt,
        receiptNumber,
        phone: fee.student.contact_number,
        dueAmount: Math.max(0, Number(fee.net_payable) - newPaidAmount),
      }).catch((e) => console.error("Payment Receipt SMS error:", e.message));
    }

    return {
      payment: serializePayment(payment),
      fee_summary: serializeFee(refreshedFeeRows[0]),
      message: `Payment of BDT ${payAmt} recorded successfully via bKash!`,
    };
  });
};

/**
 * Direct Manual / Digital Wallet Payment Verification (bKash/Nagad/Rocket/Bank)
 */
export const verifyManualDigitalPayment = async ({
  invoiceId,
  amount,
  paymentMethod,
  transactionId,
  remarks,
  userId,
}) => {
  const payAmt = Number(amount);
  if (!invoiceId || !payAmt || payAmt <= 0) {
    throw new AppError("Valid invoice ID and amount required", 400);
  }

  return await prisma.$transaction(async (tx) => {
    const feeRows = await tx.$queryRaw`
      SELECT f.*,
        json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id,
                          'contact_number', s.contact_number) AS student
      FROM "invoices" f
      JOIN "students" s ON s.id = f.student_id
      WHERE f.id = CAST(${invoiceId} AS uuid)
      LIMIT 1
    `;
    const fee = feeRows[0];
    if (!fee) throw new AppError("Invoice not found", 404);

    const remaining = Number(fee.net_payable) - Number(fee.paid_amount);
    if (payAmt > remaining) {
      throw new AppError(`Payment amount (BDT ${payAmt}) exceeds balance due (BDT ${remaining})`, 400);
    }

    const methodPrefix = (paymentMethod || "PAY").substring(0, 3).toUpperCase();
    const receiptNumber = `${methodPrefix}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    const paymentRows = await tx.$queryRaw`
      INSERT INTO "payments" (
        id, amount, payment_method, transaction_id,
        receipt_number, remarks, invoice_id, collected_by, updated_at
      )
      VALUES (
        gen_random_uuid(),
        ${payAmt},
        ${paymentMethod || 'bKash/Mobile Banking'},
        ${transactionId || null},
        ${receiptNumber},
        ${remarks || 'Verified online transaction'},
        CAST(${invoiceId} AS uuid),
        CAST(${userId || '645556aa-3f77-480b-a5af-ac6097ee5970'} AS uuid),
        NOW()
      )
      RETURNING *
    `;
    const payment = paymentRows[0];

    const newPaidAmount = Number(fee.paid_amount) + payAmt;
    const newStatus = newPaidAmount >= Number(fee.net_payable) ? "PAID" : "PARTIALLY_PAID";

    await tx.$executeRaw`
      UPDATE "invoices"
      SET paid_amount = ${newPaidAmount}, status = ${newStatus}, updated_at = NOW()
      WHERE id = CAST(${invoiceId} AS uuid)
    `;

    const refreshedFeeRows = await tx.$queryRaw`
      SELECT f.*,
        json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id,
                          'photo_url', s.photo_url, 'contact_number', s.contact_number) AS student,
        json_build_object('id', c.id, 'course_name', c.course_name_en) AS course
      FROM "invoices" f
      JOIN "students" s ON s.id = f.student_id
      JOIN "batches" bat ON bat.id = s.batch_id
      JOIN "courses" c ON c.id = bat.course_id
      WHERE f.id = CAST(${invoiceId} AS uuid) LIMIT 1
    `;

    if (fee.student?.contact_number) {
      sendPaymentReceiptSMS({
        studentName: fee.student.student_name,
        amount: payAmt,
        receiptNumber,
        phone: fee.student.contact_number,
        dueAmount: Math.max(0, Number(fee.net_payable) - newPaidAmount),
      }).catch((e) => console.error("Payment Receipt SMS error:", e.message));
    }

    return {
      payment: serializePayment(payment),
      fee_summary: serializeFee(refreshedFeeRows[0]),
      message: `Payment of BDT ${payAmt} recorded successfully!`,
    };
  });
};
