import { z } from "zod";
import { objectIdSchema } from "./common.js";

const nameRegex = /^[a-zA-Z\s\-'.]+$/;

const stringBoolean = z.preprocess((val) => {
  if (typeof val === "string") return val === "true";
  return Boolean(val);
}, z.boolean());

const studentBaseSchema = z.object({
  student_name: z.string().regex(nameRegex, "Invalid name format").optional(),
  name: z.string().regex(nameRegex, "Invalid name format").optional(),
  fathers_name: z.string().regex(nameRegex, "Invalid name format").optional(),
  fatherName: z.string().regex(nameRegex, "Invalid name format").optional(),
  student_id: z.string().min(1).optional(),
  studentId: z.string().min(1).optional(),
  registration_number: z.string().optional().default(""),
  registrationNumber: z.string().optional(),
  course: objectIdSchema.optional(),
  courseId: objectIdSchema.optional(),
  batch: objectIdSchema.optional(),
  batchId: objectIdSchema.optional(),
  branch: objectIdSchema.optional(),
  branchId: objectIdSchema.optional(),
  gender: z.preprocess((val) => typeof val === "string" ? val.toLowerCase() : val, z.enum(["male", "female"])),
  admission_date: z.string().datetime().or(z.string()).optional(),
  admissionDate: z.string().datetime().or(z.string()).optional(),
  issue_date: z.string().datetime().or(z.string()).optional(),
  issueDate: z.string().datetime().or(z.string()).optional(),
  email: z.string().email().or(z.literal("")).optional(),
  contact_number: z.string().optional().default(""),
  contactNumber: z.string().optional(),
  address: z.string().optional().default(""),

  status: z
    .enum(["active", "inactive", "completed", "discontinued", "on_leave"])
    .default("active"),
  competency: z
    .enum(["competent", "incompetent", "not_assessed"])
    .default("not_assessed"),

  discount_amount: z.coerce.number().min(0).optional().default(0),

  completion_date: z.string().nullable().optional(),

  is_active: stringBoolean.optional().default(true),
  is_verified: stringBoolean.optional().default(false),

  photo: z.any().optional(),
});

const normalizeStudentInput = (data) => ({
  ...data,
  student_name: data.student_name || data.name,
  fathers_name: data.fathers_name || data.fatherName,
  student_id: data.student_id || data.studentId,
  registration_number: data.registration_number || data.registrationNumber || "",
  course: data.course || data.courseId,
  batch: data.batch || data.batchId,
  branch: data.branch || data.branchId,
  admission_date: data.admission_date || data.admissionDate || data.issue_date || data.issueDate,
  contact_number: data.contact_number || data.contactNumber || "",
});

export const studentCreateSchema = studentBaseSchema.refine((data) => data.student_name || data.name, {
  message: "Student name is required",
  path: ["student_name"],
}).refine((data) => data.fathers_name || data.fatherName, {
  message: "Father name is required",
  path: ["fathers_name"],
}).refine((data) => data.student_id || data.studentId, {
  message: "Student ID is required",
  path: ["student_id"],
}).refine((data) => data.batch || data.batchId, {
  message: "Batch is required",
  path: ["batch"],
}).refine((data) => data.branch || data.branchId, {
  message: "Branch is required",
  path: ["branch"],
}).refine((data) => data.admission_date || data.admissionDate || data.issue_date || data.issueDate, {
  message: "Admission date is required",
  path: ["admission_date"],
}).transform(normalizeStudentInput);

export const studentUpdateSchema = studentBaseSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update",
  })
  .transform(normalizeStudentInput);
