import crypto from "crypto";
import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

export const findBatches = (filters = {}) => {
  const { branchId, status, limit, skip } = filters;
  return query`
    SELECT bat.*, 
      json_build_object('id', c.id, 'course_name', c.course_name_en) AS course,
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code) AS branch,
      COALESCE(
        (SELECT json_agg(
           json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id, 'photo_url', s.photo_url)
         ) FROM "students" s WHERE s.batch_id = bat.id),
        '[]'::json
      ) AS students
    FROM "batches" bat
    JOIN "courses" c ON c.id = bat.course_id
    JOIN "branches" b ON b.id = bat.branch_id
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR bat.status = ${status})
    ORDER BY bat.created_at DESC
    LIMIT ${limit ?? 1000000} OFFSET ${skip ?? 0}
  `;
};

export const countBatches = (filters = {}) => {
  const { branchId, status } = filters;
  return query`
    SELECT COUNT(*) as count
    FROM "batches" bat
    WHERE (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
      AND (CAST(${status || null} AS VARCHAR) IS NULL OR bat.status = ${status})
  `.then((rows) => Number(rows[0]?.count ?? 0));
};

export const findBatchFirst = (where) => {
  const { id, branchId } = where || {};
  return query`
    SELECT bat.*,
      json_build_object('id', c.id, 'course_name', c.course_name_en, 'course_code', c.course_code,
                        'duration_value', c.duration_value, 'duration_unit', c.duration_unit,
                        'base_fee', c.base_fee, 'additional_info', c.additional_info,
                        'description', c.description_en, 'is_active', c.is_active,
                        'created_at', c.created_at, 'updated_at', c.updated_at) AS course,
      '[]'::json AS instructors,
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code) AS branch,
      COALESCE(
        (SELECT json_agg(
           json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id, 'photo_url', s.photo_url)
         ) FROM "students" s WHERE s.batch_id = bat.id),
        '[]'::json
      ) AS students
    FROM "batches" bat
    JOIN "courses" c ON c.id = bat.course_id
    JOIN "branches" b ON b.id = bat.branch_id
    WHERE (CAST(${id || null} AS VARCHAR) IS NULL OR bat.id = CAST(${id} AS uuid))
      AND (CAST(${branchId || null} AS VARCHAR) IS NULL OR bat.branch_id = CAST(${branchId} AS uuid))
    LIMIT 1
  `.then((rows) => rows[0] || null);
};

export const findBatchById = (id) =>
  query`
    SELECT bat.*,
      json_build_object('id', c.id, 'course_name', c.course_name_en, 'course_code', c.course_code,
                        'duration_value', c.duration_value, 'duration_unit', c.duration_unit,
                        'base_fee', c.base_fee, 'additional_info', c.additional_info,
                        'description', c.description_en, 'is_active', c.is_active,
                        'created_at', c.created_at, 'updated_at', c.updated_at) AS course,
      '[]'::json AS instructors,
      json_build_object('id', b.id, 'branch_name', b.branch_name, 'branch_code', b.branch_code) AS branch,
      COALESCE(
        (SELECT json_agg(
           json_build_object('id', s.id, 'student_name', s.student_name, 'student_id', s.student_id, 'photo_url', s.photo_url)
         ) FROM "students" s WHERE s.batch_id = bat.id),
        '[]'::json
      ) AS students
    FROM "batches" bat
    JOIN "courses" c ON c.id = bat.course_id
    JOIN "branches" b ON b.id = bat.branch_id
    WHERE bat.id = CAST(${id} AS uuid)
    LIMIT 1
  `.then((rows) => rows[0] || null);

export const createBatch = (data) => {
  const id = crypto.randomUUID();

  return query`
    INSERT INTO "batches" (
      id, batch_name, batch_name_bn, start_date, schedule_days, class_days_bn, class_time_en, class_time_bn,
      status, capacity, duration_en, duration_bn, total_classes, badge_en, badge_bn, course_id, branch_id, updated_at
    )
    VALUES (
      CAST(${id} AS uuid), ${data.batch_name}, ${data.batch_name_bn || null}, CAST(${data.start_date} AS timestamp), CAST(${data.schedule_days || "[]"} AS jsonb),
      ${data.class_days_bn || null}, ${data.class_time_en || null}, ${data.class_time_bn || null},
      ${data.status || "Upcoming"}, ${data.capacity ? Number(data.capacity) : null}, ${data.duration_en || null}, ${data.duration_bn || null},
      ${data.total_classes ? Number(data.total_classes) : null}, ${data.badge_en || null}, ${data.badge_bn || null},
      CAST(${data.course_id} AS uuid), CAST(${data.branch_id} AS uuid), NOW()
    )
    RETURNING id
  `.then((rows) => {
    if (!rows[0]) return null;
    return findBatchById(rows[0].id);
  });
};

export const updateBatch = async (id, data) => {
  await execute`
    UPDATE "batches"
    SET batch_name = COALESCE(${data.batch_name ?? null}, batch_name),
        batch_name_bn = COALESCE(${data.batch_name_bn ?? null}, batch_name_bn),
        start_date = COALESCE(CAST(${data.start_date ?? null} AS timestamp), start_date),
        schedule_days = COALESCE(CAST(${data.schedule_days ?? null} AS jsonb), schedule_days),
        class_days_bn = COALESCE(${data.class_days_bn ?? null}, class_days_bn),
        class_time_en = COALESCE(${data.class_time_en ?? null}, class_time_en),
        class_time_bn = COALESCE(${data.class_time_bn ?? null}, class_time_bn),
        status = COALESCE(${data.status ?? null}, status),
        capacity = COALESCE(CAST(${data.capacity ?? null} AS integer), capacity),
        duration_en = COALESCE(${data.duration_en ?? null}, duration_en),
        duration_bn = COALESCE(${data.duration_bn ?? null}, duration_bn),
        total_classes = COALESCE(CAST(${data.total_classes ?? null} AS integer), total_classes),
        badge_en = COALESCE(${data.badge_en ?? null}, badge_en),
        badge_bn = COALESCE(${data.badge_bn ?? null}, badge_bn),
        course_id = COALESCE(CAST(${data.course_id ?? null} AS uuid), course_id),
        updated_at = NOW()
    WHERE id = CAST(${id} AS uuid)
  `;

  return findBatchById(id);
};

export const deleteBatch = (id) =>
  execute`DELETE FROM "batches" WHERE id = CAST(${id} AS uuid)`;

// Backwards compat aliases
export const findMany = findBatches;
export const count = countBatches;
export const findFirst = findBatchFirst;
export const findById = findBatchById;
export const create = createBatch;
export const update = updateBatch;
export const remove = deleteBatch;
