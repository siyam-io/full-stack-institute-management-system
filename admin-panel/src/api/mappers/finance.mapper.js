import { getId, toNumber } from "./common.js";

/**
 * Map a single fee record from API to UI shape.
 */
export const mapFee = (fee) => {
  if (!fee) return fee;

  const id = fee.id;
  const totalAmount = toNumber(fee.totalAmount);
  const discount = toNumber(fee.discount);
  const netPayable = toNumber(fee.netPayable);
  const paidAmount = toNumber(fee.paidAmount);
  const dueAmount = Math.max(0, netPayable - paidAmount);

  const mapped = {
    id,
    _id: id,
    totalAmount,
    discount,
    netPayable,
    paidAmount,
    dueAmount,
    status: fee.status || "UNPAID",
    createdAt: fee.createdAt,
    updatedAt: fee.updatedAt,
    // Keep original flat fields for backwards compat
    total_amount: totalAmount,
    net_payable: netPayable,
    paid_amount: paidAmount,
    studentId: fee.studentId,
    courseId: fee.courseId,
    branchId: fee.branchId,
  };

  // Map student
  if (fee.student && typeof fee.student === "object") {
    mapped.student = {
      id: fee.student.id,
      _id: fee.student.id,
      name: fee.student.studentName,
      student_name: fee.student.studentName,
      student_id: fee.student.studentId,
      photo_url: fee.student.photoUrl,
      contact_number: fee.student.contactNumber,
    };
  }

  // Map course
  if (fee.course && typeof fee.course === "object") {
    mapped.course = {
      id: fee.course.id,
      _id: fee.course.id,
      name: fee.course.courseName,
      course_name: fee.course.courseName,
      base_fee: toNumber(fee.course.baseFee),
    };
  }

  // Map discount history
  if (fee.discountHistory) {
    let runningDiscount = 0;
    const mappedHistory = fee.discountHistory.map((dh) => {
      const amt = toNumber(dh.amount);
      const prev = runningDiscount;
      runningDiscount += amt;
      const appliedByObj = dh.appliedBy;
      return {
        previousDiscount: prev,
        newDiscount: runningDiscount,
        updatedAt: dh.createdAt,
        updatedBy: appliedByObj ? {
          id: appliedByObj.id,
          full_name: appliedByObj.fullName,
        } : null,
        previous_discount: prev,
        new_discount: runningDiscount,
        updated_at: dh.createdAt,
        updated_by: appliedByObj ? {
          id: appliedByObj.id,
          full_name: appliedByObj.fullName,
        } : null,
      };
    });
    mapped.discountHistory = mappedHistory;
    mapped.discount_history = mappedHistory;
  }

  return mapped;
};

/**
 * Map a single payment from API to UI shape.
 */
export const mapPayment = (payment) => {
  if (!payment) return payment;

  const id = payment.id;
  const amount = toNumber(payment.amount);
  const collectedByObj = payment.collectedByInfo;

  const collector = collectedByObj ? {
    id: collectedByObj.id,
    _id: collectedByObj.id,
    full_name: collectedByObj.fullName,
  } : null;

  return {
    id,
    _id: id,
    amount,
    paymentMethod: payment.paymentMethod,
    transactionId: payment.transactionId,
    receiptNumber: payment.receiptNumber,
    remarks: payment.remarks || "",
    createdAt: payment.createdAt,
    // Keep original fields
    payment_method: payment.paymentMethod,
    transaction_id: payment.transactionId,
    receipt_number: payment.receiptNumber,
    created_at: payment.createdAt,
    // References
    feeRecord: payment.feeRecord,
    feeId: payment.invoiceId,
    studentId: payment.studentId,
    collectedBy: collector,
    collected_by: collector,
    branch: payment.branch ? {
      id: payment.branch.id,
      _id: payment.branch.id,
      branch_name: payment.branch.branchName,
    } : null,
  };
};

/**
 * Map a student finance summary (fee + payments).
 */
export const mapStudentFinance = (data) => {
  if (!data) return data;

  const feeSummary = mapFee(data.feeSummary || data.fee_summary);
  const transactions = (data.transactions || []).map(mapPayment);

  return {
    feeSummary,
    fee_summary: feeSummary,
    transactions,
  };
};

/**
 * Map an array of fees.
 */
export const mapFees = (fees) => (fees || []).map(mapFee);

/**
 * Map an array of payments.
 */
export const mapPayments = (payments) => (payments || []).map(mapPayment);
