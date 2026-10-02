import * as repo from "./student.repository.js";
import { deleteLocalFile } from "../../middlewares/multer.js";
import { serializeStudent } from "../../core/utils/serialize.js";
import { mapStudentInput, studentPrismaData } from "../../core/utils/refId.js";
import AppError from "../../core/errors/AppError.js";
import prisma from "../../core/db/prisma.js";

export const createStudent = async (studentData, file, isMaster, adminBranch, userId) => {
  const uploadedFilePath = file ? `/uploads/students/${file.filename}` : null;
  try {
    if (!isMaster) studentData.branch = adminBranch;
    const mapped = mapStudentInput(studentData, file);
    const courseRows = await prisma.$queryRaw`SELECT * FROM "courses" WHERE "id" = CAST(${mapped.course_id} AS uuid) LIMIT 1`;
    const course = courseRows[0];
    if (!course) throw new AppError("Selected course not found", 404);

    const result = await prisma.$transaction(async (tx) => {
      const studentRow = await tx.$queryRaw`
        INSERT INTO "students" (
          "id", "student_name", "fathers_name", "student_id", "registration_number",
          "competency", "status", "is_active", "is_verified",
          "issue_date", "completion_date", "photo_url", "gender",
          "contact_number", "email", "address",
          "batch_id", "updated_at"
        )
        VALUES (
          gen_random_uuid(), ${mapped.student_name}, ${mapped.fathers_name}, ${mapped.student_id}, ${mapped.registration_number || null},
          ${mapped.competency || "not_assessed"}, ${mapped.status || "active"}, ${mapped.is_active ?? true}, ${mapped.is_verified ?? false},
          CAST(${mapped.issue_date} AS timestamp), CAST(${mapped.completion_date || null} AS timestamp), ${mapped.photo_url || ""}, ${mapped.gender},
          ${mapped.contact_number || null}, ${mapped.email || null}, ${mapped.address || null},
          CAST(${mapped.batch_id} AS uuid), NOW()
        )
        RETURNING *
      `.then((r) => r[0]);

      const baseFee = course.base_fee ? Number(course.base_fee) : 0;
      const discount = Number(studentData.discount_amount) || 0;
      const netPayable = Math.max(0, baseFee - discount);
      const invoiceNo = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Insert invoice
      const invoiceRow = await tx.$queryRaw`
        INSERT INTO "invoices" ("id", "invoice_no", "total_amount", "discount", "net_payable", "paid_amount", "status", "student_id", "updated_at")
        VALUES (gen_random_uuid(), ${invoiceNo}, ${baseFee}, ${discount}, ${netPayable}, 0, ${netPayable === 0 ? "PAID" : "UNPAID"}, CAST(${studentRow.id} AS uuid), NOW())
        RETURNING id
      `.then(r => r[0]);

      // Insert invoice item
      await tx.$executeRaw`
        INSERT INTO "invoice_items" ("id", "description", "amount", "invoice_id")
        VALUES (gen_random_uuid(), ${`Course Enrollment Fee - ${course.course_name_en}`}, ${baseFee}, CAST(${invoiceRow.id} AS uuid))
      `;

      // Log discount if any
      if (discount > 0) {
        await tx.$executeRaw`
          INSERT INTO "discount_logs" ("id", "amount", "reason", "invoice_id", "applied_by_id")
          VALUES (gen_random_uuid(), ${discount}, 'Waiver applied during student registration', CAST(${invoiceRow.id} AS uuid), CAST(${userId || '645556aa-3f77-480b-a5af-ac6097ee5970'} AS uuid))
        `;
      }
      return studentRow;
    });
    // Find complete student with relations for serialization
    const freshStudent = await repo.findByIdWithRelations(result.id);

    // Send Admission Welcome SMS asynchronously without blocking the response
    if (freshStudent?.contact_number) {
      import("../../core/notifications/sms.service.js").then(({ sendAdmissionSMS }) => {
        sendAdmissionSMS({
          studentName: freshStudent.student_name,
          studentId: freshStudent.student_id,
          courseName: course.course_name_en,
          phone: freshStudent.contact_number,
        }).catch((err) => console.error("Admission Welcome SMS error:", err.message));
      });
    }

    return serializeStudent(freshStudent);
  } catch (error) {
    if (uploadedFilePath) deleteLocalFile(uploadedFilePath);
    throw error;
  }
};

export const modifyStudent = async (studentId, updateData, file, branchFilter, isMaster, adminBranch) => {
  const uploadedFilePath = file ? `/uploads/students/${file.filename}` : null;
  let oldPhotoUrl = null;
  try {
    const result = await prisma.$transaction(async (tx) => {
      const targetStudent = await tx.$queryRaw`
        SELECT s.*, bat.branch_id
        FROM "students" s
        JOIN "batches" bat ON bat.id = s.batch_id
        WHERE s.id = CAST(${studentId} AS uuid)
        LIMIT 1
      `.then((r) => r[0]);
      if (!targetStudent) throw new AppError("Student not found or access denied.", 404);
      if (branchFilter?.branch && targetStudent.branch_id !== branchFilter.branch) {
        throw new AppError("Student not found or access denied.", 404);
      }
      if (!isMaster) updateData.branch = adminBranch;
      const mapped = mapStudentInput(updateData, file);
      if (uploadedFilePath) oldPhotoUrl = targetStudent.photo_url;
      const data = { ...mapped };
      delete data.course_id; delete data.batch_id; delete data.branch_id;

      await tx.$executeRaw`
        UPDATE "students"
        SET "student_name" = COALESCE(${data.student_name ?? null}, "student_name"),
            "fathers_name" = COALESCE(${data.fathers_name ?? null}, "fathers_name"),
            "student_id" = COALESCE(${data.student_id ?? null}, "student_id"),
            "registration_number" = COALESCE(${data.registration_number ?? null}, "registration_number"),
            "competency" = COALESCE(${data.competency ?? null}, "competency"),
            "status" = COALESCE(${data.status ?? null}, "status"),
            "is_active" = COALESCE(${data.is_active ?? null}, "is_active"),
            "is_verified" = COALESCE(${data.is_verified ?? null}, "is_verified"),
            "issue_date" = COALESCE(CAST(${data.issue_date ?? null} AS timestamp), "issue_date"),
            "completion_date" = COALESCE(CAST(${data.completion_date ?? null} AS timestamp), "completion_date"),
            "photo_url" = COALESCE(${data.photo_url ?? null}, "photo_url"),
            "gender" = COALESCE(${data.gender ?? null}, "gender"),
            "contact_number" = COALESCE(${data.contact_number ?? null}, "contact_number"),
            "email" = COALESCE(${data.email ?? null}, "email"),
            "address" = COALESCE(${data.address ?? null}, "address"),
            "batch_id" = COALESCE(CAST(${mapped.batch_id ?? null} AS uuid), "batch_id"),
            "updated_at" = NOW()
        WHERE "id" = CAST(${studentId} AS uuid)
      `;

      const updatedStudent = await tx.$queryRaw`
        SELECT s.*,
               bat.course_id AS "course_id", bat.branch_id AS "branch_id",
               c.course_name_en AS "courseName", c.course_code AS "courseCode",
               bat.batch_name AS "batchName", bat.start_time AS "startTime", bat.end_time AS "endTime",
               b.branch_name AS "branchName"
        FROM "students" s
        JOIN "batches" bat ON bat.id = s.batch_id
        JOIN "courses" c ON c.id = bat.course_id
        JOIN "branches" b ON b.id = bat.branch_id
        WHERE s.id = CAST(${studentId} AS uuid)
        LIMIT 1
      `.then((r) => r[0]);
      return updatedStudent;
    });
    if (oldPhotoUrl) deleteLocalFile(oldPhotoUrl);
    return serializeStudent(result);
  } catch (error) {
    if (uploadedFilePath) deleteLocalFile(uploadedFilePath);
    throw error;
  }
};

export const fetchAllStudents = async (queryParams, branchFilter) => {
  const page = Math.max(1, parseInt(queryParams.page) || 1);
  const limit = Math.min(100, parseInt(queryParams.limit) || 30);
  const { search, status, branch, batch, course, is_active, is_verified, date_from, date_to } = queryParams;
  const filters = {};
  if (branchFilter?.branch_id) filters.branchId = branchFilter.branch_id;
  else if (branchFilter?.branch) filters.branchId = branchFilter.branch;
  const effectiveBranch = branchFilter?.branch || branch;
  if (effectiveBranch && effectiveBranch !== "all") filters.branchId = effectiveBranch;
  if (batch && batch !== "all") filters.batchId = batch;
  if (course && course !== "all") filters.courseId = course;
  if (status && status !== "all") filters.status = status;
  if (is_active && is_active !== "all") filters.is_active = is_active === "true";
  if (is_verified && is_verified !== "all") filters.is_verified = is_verified === "true";
  if (date_from) filters.date_from = new Date(date_from);
  if (date_to) filters.date_to = new Date(date_to);
  if (search) filters.search = search;
  const skip = (page - 1) * limit;
  const filtersWithPagination = { ...filters, limit, skip };
  const [students, total] = await Promise.all([repo.findStudents(filtersWithPagination), repo.countStudents(filters)]);
  return { students: students.map(serializeStudent), pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

export const removeStudent = async (studentId, branchFilter) => {
  const where = { id: studentId };
  if (branchFilter?.branch) where.branchId = branchFilter.branch;
  const targetStudent = await repo.findStudentFirst(where);
  if (!targetStudent) throw new AppError("Student not found or access denied.", 404);
  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`DELETE FROM "invoices" WHERE "student_id" = CAST(${studentId} AS uuid)`;
    await tx.$executeRaw`DELETE FROM "students" WHERE "id" = CAST(${studentId} AS uuid)`;
  });
  if (targetStudent.photo_url) deleteLocalFile(targetStudent.photo_url);
};

export const deleteStudentImage = async (studentId, branchFilter) => {
  const where = { id: studentId };
  if (branchFilter?.branch) where.branchId = branchFilter.branch;
  const student = await repo.findStudentFirst(where);
  if (!student) throw new AppError("Student not found or access denied.", 404);
  if (student.photo_url) deleteLocalFile(student.photo_url);
  const updated = await repo.updateStudent(studentId, { photo_url: "" });
  const fresh = await repo.findByIdWithRelations(studentId);
  return serializeStudent(fresh);
};

export const switchStudentStatus = async (studentId, branchFilter) => {
  const where = { id: studentId };
  if (branchFilter?.branch) where.branchId = branchFilter.branch;
  const student = await repo.findStudentFirst(where);
  if (!student) throw new AppError("Student not found or access denied.", 404);
  const updated = await repo.updateStudent(studentId, { is_active: !student.is_active });
  const fresh = await repo.findByIdWithRelations(studentId);
  return serializeStudent(fresh);
};

export const fetchAdminStudentById = async (studentId, branchFilter) => {
  const student = await repo.findStudentByIdWithRelations(studentId);
  if (!student) throw new AppError("Student not found or access denied.", 404);
  if (branchFilter?.branch && student.branch_id !== branchFilter.branch) {
    throw new AppError("Student not found or access denied.", 404);
  }
  return serializeStudent(student);
};

export const performStudentSearch = async (query, branchFilter) => {
  const filters = {};
  if (branchFilter?.branch) filters.branchId = branchFilter.branch;
  filters.search = query.trim();
  const students = await repo.findStudents(filters);
  return students.map(serializeStudent);
};

export const fetchPublicStudentSearch = async (query) => {
  const student = await repo.findStudentFirst({
    OR: [{ student_id: query.trim() }, { registration_number: query.trim() }],
    is_active: true,
  });
  if (!student) throw new AppError("Student not found or not active", 404);
  const full = await repo.findStudentByIdWithRelations(student.id);
  return serializeStudent(full);
};

export const fetchPublicStudentById = async (studentId) => {
  const student = await repo.findStudentByIdWithRelations(studentId);
  if (!student || !student.is_active) throw new AppError("Student not found or inactive", 404);
  return serializeStudent(student);
};
