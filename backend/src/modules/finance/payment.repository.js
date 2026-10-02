import { query, executeOne } from "../../core/db/sqlHelpers.js";

export const createPayment = (data) => {
  return executeOne`
    INSERT INTO "payments" (
      amount, payment_method, transaction_id,
      receipt_number, remarks, invoice_id, collected_by, updated_at
    )
    VALUES (
      ${data.amount}, ${data.payment_method},
      ${data.transaction_id || null}, ${data.receipt_number}, ${data.remarks || ""},
      CAST(${data.invoice_id} AS uuid), CAST(${data.collected_by} AS uuid), NOW()
    )
    RETURNING id
  `.then(async (row) => {
    if (!row) return null;
    return findPaymentById(row.id);
  });
};

export const findPaymentsByStudent = (studentId, branchId) =>
  query`
    SELECT p.*,
      CASE WHEN u.id IS NULL THEN NULL ELSE json_build_object('id', u.id, 'full_name', u.full_name) END AS collected_by_info
    FROM "payments" p
    JOIN "invoices" f ON f.id = p.invoice_id
    JOIN "students" s ON s.id = f.student_id
    JOIN "batches" bat ON bat.id = s.batch_id
    LEFT JOIN "users" u ON u.id = p.collected_by
    WHERE f.student_id = CAST(${studentId} AS uuid)
      AND (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
    ORDER BY p.created_at DESC
  `;

export const findPaymentById = (id) =>
  query`
    SELECT p.*,
      json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id) AS student,
      json_build_object('id', f.id, 'total_amount', f.total_amount, 'net_payable', f.net_payable,
                        'paid_amount', f.paid_amount, 'status', f.status) AS fee_record,
      CASE WHEN u.id IS NULL THEN NULL ELSE json_build_object('id', u.id, 'full_name', u.full_name) END AS collected_by_info,
      json_build_object('id', b.id, 'branch_name', b.branch_name) AS branch
    FROM "payments" p
    JOIN "invoices" f ON f.id = p.invoice_id
    JOIN "students" s ON s.id = f.student_id
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "branches" b ON b.id = bat.branch_id
    LEFT JOIN "users" u ON u.id = p.collected_by
    WHERE p.id = CAST(${id} AS uuid)
    LIMIT 1
  `.then((rows) => rows[0] || null);

// Legacy aliases
export const create = createPayment;
export const findByStudent = findPaymentsByStudent;
export const findById = findPaymentById;
