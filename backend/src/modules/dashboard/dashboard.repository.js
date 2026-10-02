import { query } from "../../core/db/sqlHelpers.js";

export const countStudents = (where) => {
  const branchId = where?.branchId;
  const status = where?.status;
  return query`
    SELECT COUNT(*) as count FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR s.status = ${status})
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const countBatches = (where) => {
  const branchId = where?.branchId;
  const status = where?.status;
  return query`
    SELECT COUNT(*) as count FROM "batches"
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR branch_id = CAST(${branchId} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR status = ${status})
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const getInstructorRoleId = () =>
  query`SELECT id FROM "roles" WHERE LOWER(name) LIKE '%instructor%' LIMIT 1`
    .then((rows) => rows[0]?.id || null);

export const countInstructors = (where) => {
  const branchId = where?.branchId;
  return query`
    SELECT COUNT(DISTINCT u.id) as count
    FROM "users" u
    JOIN "roles" r ON r.id = u.role_id
    WHERE LOWER(r.name) LIKE '%instructor%'
      AND (CAST(${branchId || null} AS VARCHAR) IS NULL OR u.branch_id = CAST(${branchId} AS uuid))
      AND u.status = 'Active'
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const getMonthlyPayments = (where, year) => {
  const branchId = where?.branchId;
  const startDate = new Date(year, 0, 1).toISOString();
  const endDate = new Date(year + 1, 0, 1).toISOString();
  return query`
    SELECT SUM(p.amount) as revenue,
      EXTRACT(MONTH FROM p.created_at)::integer - 1 as monthIdx
    FROM "payments" p
    JOIN "invoices" f ON f.id = p.invoice_id
    JOIN "students" s ON s.id = f.student_id
    JOIN "batches" bat ON bat.id = s.batch_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
      AND p.created_at >= ${startDate}::timestamp
      AND p.created_at < ${endDate}::timestamp
    GROUP BY monthIdx
    ORDER BY monthIdx
  `.then((rows) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const lookup = {};
    for (const r of rows) lookup[r.monthidx ?? r.monthIdx] = Number(r.revenue || 0);
    return months.map((month, i) => ({ month, revenue: lookup[i] || 0 }));
  });
};

export const getBatchDistribution = (where) => {
  const branchId = where?.branchId;
  return query`
    SELECT bat.batch_name,
      (SELECT COUNT(*) FROM "students" s WHERE s.batch_id = bat.id) as count
    FROM "batches" bat
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
    ORDER BY bat.created_at DESC
  `.then((rows) => rows.map((r) => ({ name: r.batch_name, count: Number(r.count) })));
};

export const getTotalRevenue = (where) => {
  const branchId = where?.branchId;
  return query`
    SELECT COALESCE(SUM(p.amount), 0) as total FROM "payments" p
    JOIN "invoices" f ON f.id = p.invoice_id
    JOIN "students" s ON s.id = f.student_id
    JOIN "batches" bat ON bat.id = s.batch_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
  `.then((rows) => Number(rows[0]?.total ?? 0));
};

export const getBranchName = (branchId) =>
  query`SELECT branch_name FROM "branches" WHERE id = CAST(${branchId} AS uuid) LIMIT 1`
    .then((rows) => rows[0]?.branch_name || "Unknown Campus");

export const getPendingRequisitionsCount = (branchId) =>
  Promise.resolve(0);

export const getRecentStudents = (branchId, limit = 5) =>
  query`
    SELECT s.id, s.student_name, s.student_id, s.photo_url, s.created_at
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    WHERE bat.branch_id = CAST(${branchId} AS uuid)
    ORDER BY s.created_at DESC
    LIMIT ${limit}
  `;

export const getRecentPayments = (branchId, limit = 5) =>
  query`
    SELECT p.id, p.amount, p.payment_method AS payment_type, p.created_at,
      json_build_object('student_name', s.student_name, 'student_id', s.student_id) AS student
    FROM "payments" p
    JOIN "invoices" f ON f.id = p.invoice_id
    JOIN "students" s ON s.id = f.student_id
    JOIN "batches" bat ON bat.id = s.batch_id
    WHERE bat.branch_id = CAST(${branchId} AS uuid)
    ORDER BY p.created_at DESC
    LIMIT ${limit}
  `;
