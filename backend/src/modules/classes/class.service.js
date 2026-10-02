import * as repo from "./class.repository.js";
import { serializeClassContent } from "../../core/utils/serialize.js";
import { mapClassInput, refId } from "../../core/utils/refId.js";
import AppError from "../../core/errors/AppError.js";
import { addDays, startOfDay } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import prisma from "../../core/db/prisma.js";

// -- Batch Classes --
export const fetchBatchClasses = async (batchId, branchFilter) => {
  const branchVal = branchFilter?.branch_id || branchFilter?.branch || null;
  let batchRows;
  if (branchVal) {
    batchRows = await prisma.$queryRaw`
      SELECT id FROM "batches" WHERE id = CAST(${batchId} AS uuid)
      AND branch_id = CAST(${branchVal} AS uuid)
      LIMIT 1
    `;
  } else {
    batchRows = await prisma.$queryRaw`
      SELECT id FROM "batches" WHERE id = CAST(${batchId} AS uuid)
      LIMIT 1
    `;
  }
  if (!batchRows[0]) throw new AppError("Batch not found or unauthorized.", 404);

  const classes = await repo.findClassesByBatch(batchId);
  return classes.map(serializeClassContent);
};

export const injectClassesToSyllabus = async (batchId, classesData, branchFilter) => {
  return await prisma.$transaction(async (tx) => {
    const branchVal = branchFilter?.branch_id || branchFilter?.branch || null;
    let batchRows;
    if (branchVal) {
      batchRows = await tx.$queryRaw`
        SELECT * FROM "batches" WHERE id = CAST(${batchId} AS uuid)
        AND branch_id = CAST(${branchVal} AS uuid)
        LIMIT 1
      `;
    } else {
      batchRows = await tx.$queryRaw`
        SELECT * FROM "batches" WHERE id = CAST(${batchId} AS uuid)
        LIMIT 1
      `;
    }
    if (!batchRows[0]) throw new AppError("Batch not found or unauthorized.", 404);

    const classArray = Array.isArray(classesData) ? classesData : [classesData];
    const newClasses = [];
    for (const cls of classArray) {
      const row = await tx.$queryRaw`
        INSERT INTO "class_contents" (id, batch_id, topic, class_number, content_details, date_scheduled, is_completed, updated_at)
        VALUES (gen_random_uuid(), CAST(${batchId} AS uuid), ${cls.topic}, ${Number(cls.order_index || cls.class_number)}, CAST('[]' AS jsonb), NULL, false, NOW())
        RETURNING *
      `.then((r) => r[0]);
      newClasses.push(row);
    }
    return newClasses.map(serializeClassContent);
  });
};

export const insertClassesToSyllabus = injectClassesToSyllabus;

// -- Modify / Delete --
export const modifyClassContent = async (classId, updateData, branchFilter) => {
  if (Array.isArray(updateData.content_details)) {
    updateData.content_details = JSON.stringify(updateData.content_details);
  }

  const existing = await repo.findClassById(classId);
  if (!existing) throw new AppError("Class not found or unauthorized.", 404);
  const branchVal = branchFilter?.branch_id || branchFilter?.branch || null;
  if (branchVal && existing.batch?.branch_id !== branchVal) {
    throw new AppError("Class not found or unauthorized.", 404);
  }

  const data = {};
  if (updateData.topic !== undefined) data.topic = updateData.topic;
  if (updateData.content_details !== undefined) data.content_details = updateData.content_details;
  if (updateData.is_completed !== undefined) data.is_completed = updateData.is_completed;
  if (updateData.instructor !== undefined) {
    data.instructor_id = updateData.instructor ? refId(updateData.instructor) : null;
  } else if (updateData.instructorId !== undefined) {
    data.instructor_id = updateData.instructorId;
  }

  const updated = await repo.updateClass(classId, data);
  return serializeClassContent(updated);
};

export const assignClassDate = async (classId, dateScheduled) => {
  const updated = await repo.updateClass(classId, { date_scheduled: new Date(dateScheduled) });
  return serializeClassContent(updated);
};

export const removeClassContent = async (classId, branchFilter) => {
  await prisma.$transaction(async (tx) => {
    const classRow = await tx.$queryRaw`
      SELECT cc.id, cc.batch_id, b.branch_id
      FROM "class_contents" cc
      JOIN "batches" b ON b.id = cc.batch_id
      WHERE cc.id = CAST(${classId} AS uuid)
      LIMIT 1
    `.then((r) => r[0]);
    if (!classRow) throw new AppError("Class not found or unauthorized.", 404);
    const branchVal = branchFilter?.branch_id || branchFilter?.branch || null;
    if (branchVal && classRow.branch_id !== branchVal) {
      throw new AppError("Class not found or unauthorized.", 404);
    }
    await tx.$executeRaw`DELETE FROM "class_contents" WHERE id = CAST(${classId} AS uuid)`;
  });
};

// -- Auto Scheduler --
export const generateAutoSchedule = async (batchId, branchFilter) => {
  return await prisma.$transaction(async (tx) => {
    const branchVal = branchFilter?.branch_id || branchFilter?.branch || null;
    let batchRows;
    if (branchVal) {
      batchRows = await tx.$queryRaw`
        SELECT * FROM "batches" WHERE id = CAST(${batchId} AS uuid)
        AND branch_id = CAST(${branchVal} AS uuid)
        LIMIT 1
      `;
    } else {
      batchRows = await tx.$queryRaw`
        SELECT * FROM "batches" WHERE id = CAST(${batchId} AS uuid)
        LIMIT 1
      `;
    }
    const batch = batchRows[0];
    if (!batch || !batch.start_date || !batch.schedule_days?.length) {
      throw new AppError("Batch missing configuration (Start Date/Schedule Days)", 400);
    }

    const classes = await tx.$queryRaw`
      SELECT * FROM "class_contents" WHERE batch_id = CAST(${batchId} AS uuid) ORDER BY class_number ASC
    `;
    if (classes.length === 0) throw new AppError("Syllabus is empty.", 400);

    const holidayList = ["02-21", "03-17", "03-26", "04-14", "05-01", "08-15", "12-16", "12-25"];

    const isHoliday = (dateToCheck) => {
      const monthDay = formatInTimeZone(dateToCheck, "Asia/Dhaka", "MM-dd");
      const fullDate = formatInTimeZone(dateToCheck, "Asia/Dhaka", "yyyy-MM-dd");
      return holidayList.includes(monthDay) || holidayList.includes(fullDate);
    };

    const safeScheduleDays = (typeof batch.schedule_days === "string"
      ? JSON.parse(batch.schedule_days)
      : batch.schedule_days
    ).map((day) => day.toLowerCase());

    let currentCheckDate = startOfDay(new Date(batch.start_date));
    const MAX_SEARCH_DAYS = 365;

    for (const cls of classes) {
      let dateFound = false;
      let loopCounter = 0;
      while (!dateFound) {
        if (loopCounter > MAX_SEARCH_DAYS) {
          throw new AppError(`Failed to schedule Class ${cls.class_number}. Exceeded 1 year limit.`, 400);
        }
        const dayName = formatInTimeZone(currentCheckDate, "Asia/Dhaka", "EEEE").toLowerCase();
        if (safeScheduleDays.includes(dayName) && !isHoliday(currentCheckDate)) {
          await tx.$executeRaw`
            UPDATE "class_contents" SET date_scheduled = CAST(${new Date(currentCheckDate).toISOString()} AS timestamp) WHERE id = CAST(${cls.id} AS uuid)
          `;
          dateFound = true;
        }
        currentCheckDate = addDays(currentCheckDate, 1);
        loopCounter++;
      }
    }

    return { scheduled: classes.length };
  });
};
