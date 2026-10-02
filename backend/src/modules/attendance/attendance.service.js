import prisma from "../../core/db/prisma.js";
import AppError from "../../core/errors/AppError.js";

/**
 * Get all students in a batch with their attendance record for a specific date
 */
export const getBatchAttendance = async (batchId, dateStr) => {
  const targetDate = dateStr ? new Date(dateStr) : new Date();
  const dateFormatted = targetDate.toISOString().split("T")[0];

  // 1. Fetch batch info
  const batchRows = await prisma.$queryRaw`
    SELECT b.id, b.batch_name, b.start_date, b.status,
      c.course_name_en, c.course_code
    FROM "batches" b
    JOIN "courses" c ON c.id = b.course_id
    WHERE b.id = CAST(${batchId} AS uuid)
    LIMIT 1
  `;
  const batch = batchRows[0];
  if (!batch) throw new AppError("Batch not found", 404);

  // 2. Fetch all active students in batch
  const students = await prisma.$queryRaw`
    SELECT s.id, s.student_name, s.student_id, s.contact_number, s.photo_url, s.status,
      a.id AS attendance_id,
      COALESCE(a.status, 'unmarked') AS attendance_status,
      a.remarks AS attendance_remarks,
      a.created_at AS attendance_recorded_at
    FROM "students" s
    LEFT JOIN "attendances" a 
      ON a.student_id = s.id 
      AND a.batch_id = CAST(${batchId} AS uuid) 
      AND a.date = CAST(${dateFormatted} AS date)
    WHERE s.batch_id = CAST(${batchId} AS uuid)
      AND s.is_active = true
    ORDER BY s.student_name ASC
  `;

  // Calculate statistics
  let presentCount = 0;
  let absentCount = 0;
  let lateCount = 0;
  let unmarkedCount = 0;

  for (const s of students) {
    if (s.attendance_status === "present") presentCount++;
    else if (s.attendance_status === "absent") absentCount++;
    else if (s.attendance_status === "late") lateCount++;
    else unmarkedCount++;
  }

  const total = students.length;
  const markedTotal = presentCount + absentCount + lateCount;
  const attendancePercentage = markedTotal > 0 ? Math.round((presentCount / markedTotal) * 100) : 0;

  return {
    batch,
    date: dateFormatted,
    students,
    stats: {
      total,
      presentCount,
      absentCount,
      lateCount,
      unmarkedCount,
      attendancePercentage,
    },
  };
};

/**
 * Save or bulk-update attendance for a batch on a given date
 */
export const saveBatchAttendance = async ({ batchId, dateStr, records, recordedBy, classContentId }) => {
  const targetDate = dateStr ? new Date(dateStr) : new Date();
  const dateFormatted = targetDate.toISOString().split("T")[0];

  if (!Array.isArray(records) || records.length === 0) {
    throw new AppError("No attendance records provided", 400);
  }

  return await prisma.$transaction(async (tx) => {
    for (const rec of records) {
      const studentId = rec.studentId || rec.student_id;
      const status = rec.status || "present";
      const remarks = rec.remarks || null;
      const cid = rec.classContentId || classContentId || null;
      const recBy = recordedBy || null;

      if (!studentId) continue;

      await tx.$executeRaw`
        INSERT INTO "attendances" (
          id, date, status, remarks,
          student_id, batch_id, class_content_id, recorded_by, updated_at
        )
        VALUES (
          gen_random_uuid(),
          CAST(${dateFormatted} AS date),
          ${status},
          ${remarks},
          CAST(${studentId} AS uuid),
          CAST(${batchId} AS uuid),
          CAST(${cid} AS uuid),
          CAST(${recBy} AS uuid),
          NOW()
        )
        ON CONFLICT (student_id, batch_id, date)
        DO UPDATE SET
          status = EXCLUDED.status,
          remarks = EXCLUDED.remarks,
          recorded_by = EXCLUDED.recorded_by,
          updated_at = NOW()
      `;
    }

    return { success: true, count: records.length, date: dateFormatted };
  });
};

/**
 * Scan Student QR Code to instantly mark attendance
 */
export const scanQRAndMarkAttendance = async ({ qrData, batchId, recordedBy }) => {
  if (!qrData) throw new AppError("QR code data is required", 400);

  let searchStudentId = "";
  let searchUuid = "";

  // 1. Try parsing JSON if encoded from ID Card QR
  try {
    const parsed = typeof qrData === "string" ? JSON.parse(qrData) : qrData;
    searchStudentId = parsed.id || parsed.studentId || parsed.student_id || "";
    searchUuid = parsed.uuid || parsed._id || "";
  } catch {
    // If not JSON, it could be the raw Student ID (e.g. "STD-2024-001") or UUID or URL
    if (typeof qrData === "string") {
      if (qrData.includes("/student/")) {
        const parts = qrData.split("/student/");
        searchUuid = parts[parts.length - 1].split("?")[0].split("/")[0];
      } else {
        searchStudentId = qrData.trim();
      }
    }
  }

  // 2. Lookup student
  const studentRows = await prisma.$queryRaw`
    SELECT s.*, b.batch_name, b.id AS batch_id, c.course_name_en
    FROM "students" s
    JOIN "batches" b ON b.id = s.batch_id
    JOIN "courses" c ON c.id = b.course_id
    WHERE s.student_id = ${searchStudentId}
       OR s.registration_number = ${searchStudentId}
       OR (CAST(${searchUuid || null} AS VARCHAR) IS NOT NULL AND s.id = CAST(${searchUuid || '00000000-0000-0000-0000-000000000000'} AS uuid))
    LIMIT 1
  `;

  const student = studentRows[0];
  if (!student) {
    throw new AppError(`Student not found for QR data: "${searchStudentId || searchUuid || qrData}"`, 404);
  }

  // If a specific batch was selected, verify student belongs to it
  const effectiveBatchId = batchId || student.batch_id;
  if (batchId && student.batch_id !== batchId) {
    throw new AppError(`Student "${student.student_name}" belongs to batch "${student.batch_name}", not the selected batch.`, 400);
  }

  // 3. Mark attendance as "present" for today
  const todayFormatted = new Date().toISOString().split("T")[0];
  const recBy = recordedBy || null;

  await prisma.$executeRaw`
    INSERT INTO "attendances" (
      id, date, status, remarks,
      student_id, batch_id, recorded_by, updated_at
    )
    VALUES (
      gen_random_uuid(),
      CAST(${todayFormatted} AS date),
      'present',
      'Marked via Camera QR Scanner',
      CAST(${student.id} AS uuid),
      CAST(${effectiveBatchId} AS uuid),
      CAST(${recBy} AS uuid),
      NOW()
    )
    ON CONFLICT (student_id, batch_id, date)
    DO UPDATE SET
      status = 'present',
      remarks = 'Verified via Camera QR Scanner',
      updated_at = NOW()
  `;

  return {
    student: {
      id: student.id,
      student_name: student.student_name,
      student_id: student.student_id,
      contact_number: student.contact_number,
      photo_url: student.photo_url,
      course_name: student.course_name_en,
      batch_name: student.batch_name,
    },
    status: "present",
    date: todayFormatted,
    message: `Attendance confirmed for ${student.student_name} (${student.student_id})`,
  };
};

/**
 * Get attendance records for a single student
 */
export const getStudentAttendance = async (studentId) => {
  const records = await prisma.$queryRaw`
    SELECT a.*, b.batch_name
    FROM "attendances" a
    JOIN "batches" b ON b.id = a.batch_id
    WHERE a.student_id = CAST(${studentId} AS uuid)
    ORDER BY a.date DESC
  `;

  let present = 0;
  let absent = 0;
  let late = 0;

  for (const r of records) {
    if (r.status === "present") present++;
    else if (r.status === "absent") absent++;
    else if (r.status === "late") late++;
  }

  const total = records.length;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return {
    records,
    summary: {
      total,
      present,
      absent,
      late,
      percentage,
    },
  };
};
