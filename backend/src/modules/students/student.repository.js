import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

export const findStudents = (filters = {}) => {
  const { branchId, batchId, courseId, status, is_active, is_verified,
          date_from, date_to, search, limit, skip } = filters;

  return query`
    SELECT s.*, 
           bat.course_id AS "course_id", bat.branch_id AS "branch_id",
           c.course_name_en AS "courseName", c.course_code AS "courseCode",
           bat.batch_name AS "batchName",
           b.branch_name AS "branchName"
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    JOIN "branches" b ON b.id = bat.branch_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
      AND (CAST(${batchId || null} AS VARCHAR) IS NULL OR s.batch_id = CAST(${batchId} AS uuid))
      AND (CAST(${courseId || null} AS VARCHAR) IS NULL OR bat.course_id = CAST(${courseId} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR s.status = ${status})
      AND (CAST(${is_active ?? null} AS VARCHAR) IS NULL OR s.is_active = ${is_active})
      AND (CAST(${is_verified ?? null} AS VARCHAR) IS NULL OR s.is_verified = ${is_verified})
      AND (CAST(${date_from || null} AS VARCHAR) IS NULL OR s.created_at >= ${date_from})
      AND (CAST(${date_to || null} AS VARCHAR) IS NULL OR s.created_at <= ${date_to})
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR (
        LOWER(s.student_name) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(s.student_id) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(s.contact_number) LIKE LOWER('%' || ${search || ""} || '%')
      ))
    ORDER BY s.created_at DESC
    LIMIT ${limit ?? 1000000} OFFSET ${skip ?? 0}
  `;
};

export const countStudents = (filters = {}) => {
  const { branchId, batchId, courseId, status, is_active, is_verified,
          date_from, date_to, search } = filters;
  return query`
    SELECT COUNT(*) as count
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
      AND (CAST(${batchId || null} AS VARCHAR) IS NULL OR s.batch_id = CAST(${batchId} AS uuid))
      AND (CAST(${courseId || null} AS VARCHAR) IS NULL OR bat.course_id = CAST(${courseId} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR s.status = ${status})
      AND (CAST(${is_active ?? null} AS VARCHAR) IS NULL OR s.is_active = ${is_active})
      AND (CAST(${is_verified ?? null} AS VARCHAR) IS NULL OR s.is_verified = ${is_verified})
      AND (CAST(${date_from || null} AS VARCHAR) IS NULL OR s.created_at >= ${date_from})
      AND (CAST(${date_to || null} AS VARCHAR) IS NULL OR s.created_at <= ${date_to})
      AND (CAST(${search || null} AS VARCHAR) IS NULL OR (
        LOWER(s.student_name) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(s.student_id) LIKE LOWER('%' || ${search || ""} || '%') OR
        LOWER(s.contact_number) LIKE LOWER('%' || ${search || ""} || '%')
      ))
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const findStudentFirst = (where) => {
  const { id, branchId, student_id, registration_number, is_active } = where || {};
  let orStudentId = null;
  let orRegNum = null;
  if (where?.OR) {
    for (const cond of where.OR) {
      if (cond.student_id) orStudentId = cond.student_id;
      if (cond.registration_number) orRegNum = cond.registration_number;
    }
  }

  return query`
    SELECT s.*, 
           bat.course_id AS "course_id", bat.branch_id AS "branch_id",
           c.course_name_en AS "courseName", c.course_code AS "courseCode",
           bat.batch_name AS "batchName",
           b.branch_name AS "branchName"
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    JOIN "branches" b ON b.id = bat.branch_id
    WHERE (CAST(${id || null} AS VARCHAR) IS NULL OR s.id = CAST(${id} AS uuid))
      AND (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
      AND (CAST(${is_active ?? null} AS VARCHAR) IS NULL OR s.is_active = ${is_active})
      AND (CAST(${orStudentId || null} AS VARCHAR) IS NULL OR s.student_id = ${orStudentId})
      AND (CAST(${orRegNum || null} AS VARCHAR) IS NULL OR s.registration_number = ${orRegNum})
    LIMIT 1
  `.then((rows) => rows[0] || null);
};

export const findStudentById = (id) =>
  query`
    SELECT s.*, 
           bat.course_id AS "course_id", bat.branch_id AS "branch_id",
           c.course_name_en AS "courseName", c.course_code AS "courseCode",
           bat.batch_name AS "batchName",
           b.branch_name AS "branchName"
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    JOIN "branches" b ON b.id = bat.branch_id
    WHERE s.id = CAST(${id} AS uuid)
    LIMIT 1
  `.then((rows) => rows[0] || null);

export const findStudentByIdWithRelations = (id) => {
  return query`
    SELECT s.*, 
           bat.course_id AS "course_id", bat.branch_id AS "branch_id",
           c.course_name_en AS "courseName", c.course_code AS "courseCode",
           bat.batch_name AS "batchName", bat.start_time AS "startTime", bat.end_time AS "endTime",
           b.branch_name AS "branchName"
    FROM "students" s
    JOIN "batches" bat ON bat.id = s.batch_id
    JOIN "courses" c ON c.id = bat.course_id
    JOIN "branches" b ON b.id = bat.branch_id
    WHERE s.id = CAST(${id} AS uuid)
    LIMIT 1
  `.then(async (rows) => {
    const student = rows[0] || null;
    if (!student) return null;

    // Fetch comments in a separate simple raw query
    const comments = await query`
      SELECT com.*, 
        json_build_object('id', u.id, 'full_name', u.full_name, 'photo_url', u.photo_url, 'designation', u.designation) AS "commenter"
      FROM "comments" com
      JOIN "users" u ON u.id = com.comment_by
      WHERE com.student_id = CAST(${id} AS uuid)
      ORDER BY com.created_at DESC
      LIMIT 20
    `;
    student.comments = comments;
    return student;
  });
};

export const createStudent = (data) => {
  return executeOne`
    INSERT INTO "students" (
      "student_name", "student_name_bn", "fathers_name", "fathers_name_bn", "student_id", "registration_number",
      "competency", "status", "is_active", "is_verified",
      "admission_date", "completion_date", "photo_url", "gender",
      "contact_number", "email", "address",
      "batch_id", "updated_at"
    )
    VALUES (
      ${data.student_name}, ${data.student_name_bn || null}, ${data.fathers_name}, ${data.fathers_name_bn || null}, ${data.student_id}, ${data.registration_number || null},
      ${data.competency || "not_assessed"}, ${data.status || "active"}, ${data.is_active ?? true}, ${data.is_verified ?? false},
      ${data.admission_date || new Date().toISOString()}, ${data.completion_date || null}, ${data.photo_url || ""}, ${data.gender},
      ${data.contact_number || null}, ${data.email || null}, ${data.address || null},
      CAST(${data.batch_id} AS uuid), NOW()
    )
    RETURNING id
  `.then((row) => (row ? findStudentById(row.id) : null));
};

export const updateStudent = (id, data) => {
  return executeOne`
    UPDATE "students"
    SET "student_name" = COALESCE(${data.student_name ?? null}, "student_name"),
        "student_name_bn" = COALESCE(${data.student_name_bn ?? null}, "student_name_bn"),
        "fathers_name" = COALESCE(${data.fathers_name ?? null}, "fathers_name"),
        "fathers_name_bn" = COALESCE(${data.fathers_name_bn ?? null}, "fathers_name_bn"),
        "student_id" = COALESCE(${data.student_id ?? null}, "student_id"),
        "registration_number" = COALESCE(${data.registration_number ?? null}, "registration_number"),
        "competency" = COALESCE(${data.competency ?? null}, "competency"),
        "status" = COALESCE(${data.status ?? null}, "status"),
        "is_active" = COALESCE(${data.is_active ?? null}, "is_active"),
        "is_verified" = COALESCE(${data.is_verified ?? null}, "is_verified"),
        "admission_date" = COALESCE(${data.admission_date ?? null}, "admission_date"),
        "completion_date" = COALESCE(${data.completion_date ?? null}, "completion_date"),
        "photo_url" = COALESCE(${data.photo_url ?? null}, "photo_url"),
        "gender" = COALESCE(${data.gender ?? null}, "gender"),
        "contact_number" = COALESCE(${data.contact_number ?? null}, "contact_number"),
        "email" = COALESCE(${data.email ?? null}, "email"),
        "address" = COALESCE(${data.address ?? null}, "address"),
        "batch_id" = COALESCE(CAST(${data.batch_id ?? null} AS uuid), "batch_id"),
        "updated_at" = NOW()
    WHERE "id" = CAST(${id} AS uuid)
    RETURNING *
  `;
};

export const deleteStudent = (id) =>
  execute`DELETE FROM "students" WHERE "id" = CAST(${id} AS uuid)`;

// Kept for backwards compat - service still calls these
export const findMany = findStudents;
export const count = countStudents;
export const findFirst = findStudentFirst;
export const findById = findStudentById;
export const findByIdWithRelations = findStudentByIdWithRelations;
export const create = createStudent;
export const update = updateStudent;
export const remove = deleteStudent;
