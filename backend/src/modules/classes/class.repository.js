import { query, executeOne, execute } from "../../core/db/sqlHelpers.js";

export const findBatchById = (id) =>
  query`
    SELECT id, branch_id, start_date, schedule_days
    FROM "batches" WHERE id = CAST(${id} AS uuid) LIMIT 1
  `.then((rows) => rows[0] || null);

export const findClassesByBatch = (batchId) =>
  query`
    SELECT * FROM "class_contents"
    WHERE batch_id = CAST(${batchId} AS uuid)
    ORDER BY class_number ASC
  `;

export const findClassById = (id) =>
  query`
    SELECT cc.*, json_build_object('id', b.id, 'branch_id', b.branch_id) AS batch
    FROM "class_contents" cc
    LEFT JOIN "batches" b ON b.id = cc.batch_id
    WHERE cc.id = CAST(${id} AS uuid)
    LIMIT 1
  `.then((rows) => rows[0] || null);

export const createClass = (data) => {
  return executeOne`
    INSERT INTO "class_contents" (
      class_number, topic, content_details, date_scheduled,
      is_completed, batch_id, instructor_id, updated_at
    )
    VALUES (
      ${data.class_number ?? null}, ${data.topic}, CAST(${data.content_details || "[]"} AS jsonb),
      ${data.date_scheduled ?? null}, ${data.is_completed ?? false},
      CAST(${data.batch_id} AS uuid), CAST(${data.instructor_id || null} AS uuid), NOW()
    )
    RETURNING *
  `;
};

export const updateClass = (id, data) => {
  return executeOne`
    UPDATE "class_contents"
    SET topic = COALESCE(${data.topic ?? null}, topic),
        content_details = COALESCE(CAST(${data.content_details ?? null} AS jsonb), content_details),
        is_completed = COALESCE(${data.is_completed ?? null}, is_completed),
        date_scheduled = COALESCE(${data.date_scheduled ?? null}, date_scheduled),
        instructor_id = CAST(${data.instructor_id ?? null} AS uuid),
        updated_at = NOW()
    WHERE id = CAST(${id} AS uuid)
    RETURNING *
  `;
};

export const deleteClass = (id) =>
  execute`DELETE FROM "class_contents" WHERE id = CAST(${id} AS uuid)`;

