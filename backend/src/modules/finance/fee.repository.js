import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

const FEE_BASE_SQL = `
  json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id,
              'photo_url', s.photo_url, 'contact_number', s.contact_number) AS student,
  json_build_object('id', c.id, 'course_name', c.course_name_en, 'base_fee', c.base_fee) AS course
`;

export const findFeeFirst = (where) => {
  const { id, studentId, branchId } = where || {};
  return query`
    SELECT f.*, ${query.raw(FEE_BASE_SQL)},
      COALESCE(
        (SELECT json_agg(
           json_build_object('id', dl.id, 'amount', dl.amount,
                             'reason', dl.reason, 'created_at', dl.created_at,
                             'applied_by', json_build_object('id', u.id, 'full_name', u.full_name))
         ) FROM "discount_logs" dl
         LEFT JOIN "users" u ON u.id = dl.applied_by_id
         WHERE dl.invoice_id = f.id),
        '[]'::json
      ) AS "discountHistory",
      COALESCE(
        (SELECT json_agg(
           json_build_object('id', item.id, 'description', item.description, 'amount', item.amount)
         ) FROM "invoice_items" item
         WHERE item.invoice_id = f.id),
        '[]'::json
      ) AS "items"
    FROM "invoices" f
    JOIN "students" s ON s.id = f.student_id
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    WHERE (CAST(${id || null} AS VARCHAR) IS NULL OR f.id = CAST(${id || null} AS uuid))
      AND (CAST(${studentId || null} AS VARCHAR) IS NULL OR f.student_id = CAST(${studentId || null} AS uuid))
      AND (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId || null} AS uuid))
    LIMIT 1
  `.then((rows) => rows[0] || null);
};

export const findFeeMany = (where) => {
  const { branchId, status } = where || {};
  return query`
    SELECT f.*, ${query.raw(FEE_BASE_SQL)}
    FROM "invoices" f
    JOIN "students" s ON s.id = f.student_id
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId || null} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR f.status = ${status})
    ORDER BY f.created_at DESC
  `;
};

export const findFeeById = (id) =>
  query`SELECT * FROM "invoices" WHERE id = ${id} LIMIT 1`.then((rows) => rows[0] || null);

export const updateFee = (id, data) =>
  executeOne`
    UPDATE "invoices"
    SET paid_amount = COALESCE(${data.paid_amount ?? null}, paid_amount),
        discount = COALESCE(${data.discount ?? null}, discount),
        net_payable = COALESCE(${data.net_payable ?? null}, net_payable),
        status = COALESCE(${data.status ?? null}, status),
        updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;

// Legacy aliases
export const findFirst = findFeeFirst;
export const findMany = findFeeMany;
export const findById = findFeeById;
export const update = updateFee;
