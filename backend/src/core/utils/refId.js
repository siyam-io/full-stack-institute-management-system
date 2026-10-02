/**
 * Input Mapping Layer
 * Converts frontend API request payloads (camelCase/flat IDs)
 * into database-compatible data objects (snake_case).
 */

const stringifyArray = (value) => {
  if (Array.isArray(value)) return JSON.stringify(value);
  return value;
};

export const refId = (value) => {
  if (!value) return value;
  if (typeof value === "string") return value;
  return value.id || value._id;
};

// --- COURSE ---

export const mapCourseInput = (body) => ({
  course_name: body.courseName || body.course_name,
  course_code: (body.courseCode || body.course_code)?.toUpperCase(),
  duration_value: Number(body.durationValue || body.duration?.value || body.duration_value),
  duration_unit: body.durationUnit || body.duration?.unit || body.duration_unit || "months",
  base_fee: Number(body.baseFee || body.base_fee || 0),
  additional_info: stringifyArray(body.additionalInfo || body.additional_info || []),
  description: body.description ?? "",
});

export const coursePrismaData = (mapped) => mapped;

// --- BATCH ---

export const mapBatchInput = (body) => ({
  batch_name: body.batchName || body.batch_name,
  batch_name_bn: body.batchNameBn || body.batch_name_bn || null,
  start_date: new Date(body.startDate || body.start_date),
  schedule_days: stringifyArray(body.scheduleDays || body.schedule_days || []),
  class_days_bn: body.classDaysBn || body.class_days_bn || null,
  class_time_en: body.classTimeEn || body.class_time_en || null,
  class_time_bn: body.classTimeBn || body.class_time_bn || null,
  status: body.status ?? "Upcoming",
  capacity: body.capacity !== undefined && body.capacity !== null ? Number(body.capacity) : null,
  duration_en: body.durationEn || body.duration_en || null,
  duration_bn: body.durationBn || body.duration_bn || null,
  total_classes: body.totalClasses !== undefined && body.totalClasses !== null ? Number(body.totalClasses) : (body.total_classes ? Number(body.total_classes) : null),
  badge_en: body.badgeEn || body.badge_en || null,
  badge_bn: body.badgeBn || body.badge_bn || null,
  course_id: body.courseId || refId(body.course),
  branch_id: body.branchId || refId(body.branch),
});

export const batchPrismaData = (mapped) => {
  const { course_id, branch_id, ...rest } = mapped;
  return {
    ...rest,
    course: { connect: { id: course_id } },
    branch: { connect: { id: branch_id } },
  };
};

// --- STUDENT ---

export const mapStudentInput = (body, file) => {
  const data = {
    student_name: body.name || body.student_name,
    fathers_name: body.fatherName || body.fathers_name,
    student_id: body.studentId || body.student_id,
    registration_number: body.registrationNumber || body.registration_number || null,
    competency: body.competency || "not_assessed",
    status: body.status || "active",
    is_active: body.isActive !== undefined ? body.isActive === true || body.isActive === "true" : true,
    is_verified: body.isVerified !== undefined ? body.isVerified === true || body.isVerified === "true" : false,
    admission_date: new Date(body.admissionDate || body.admission_date || body.issueDate || body.issue_date || Date.now()),
    completion_date: body.completionDate || body.completion_date ? new Date(body.completionDate || body.completion_date) : null,
    gender: body.gender,
    contact_number: body.contactNumber || body.contact_number || null,
    email: body.email || null,
    address: body.address || null,
    course_id: body.courseId || refId(body.course),
    batch_id: body.batchId || refId(body.batch),
    branch_id: body.branchId || refId(body.branch),
  };
  if (file) {
    data.photo_url = file.url || (file.path?.startsWith("http") ? file.path : `/uploads/students/${file.filename}`);
  }
  return data;
};

export const studentPrismaData = (mapped) => {
  const { course_id, batch_id, branch_id, ...rest } = mapped;
  return {
    ...rest,
    course: { connect: { id: course_id } },
    batch: { connect: { id: batch_id } },
    branch: { connect: { id: branch_id } },
  };
};

// --- USER (EMPLOYEE) ---

export const mapUserInput = (body, file) => {
  const data = {
    username: body.username,
    email: body.email?.toLowerCase(),
    password: body.password,
    employee_id: body.employeeId || body.employee_id,
    full_name: body.fullName || body.full_name,
    full_name_bn: body.fullNameBn || body.full_name_bn || null,
    phone: body.phone || undefined,
    designation: body.designation || "Staff",
    department: body.department || "General",
    joining_date: body.joiningDate || body.joining_date ? new Date(body.joiningDate || body.joining_date) : new Date(),
    status: body.status || "Active",
    facebook: body.facebook || body.social_links?.facebook || "",
    linkedin: body.linkedin || body.social_links?.linkedin || "",
    twitter: body.twitter || body.social_links?.twitter || "",
    instagram: body.instagram || body.social_links?.instagram || "",
    custom: body.custom || body.others || body.social_links?.custom || "",
    role_id: body.roleId || refId(body.role),
    branch_id: body.branchId || refId(body.branch),
  };
  if (file) data.photo_url = `/uploads/employees/${file.filename}`;
  if (!data.password || data.password === "") delete data.password;
  return data;
};

export const userPrismaData = (mapped) => {
  const { role_id, branch_id, ...rest } = mapped;
  return {
    ...rest,
    role: { connect: { id: role_id } },
    branch: { connect: { id: branch_id } },
  };
};

// --- BRANCH ---

export const mapBranchInput = (body) => ({
  branch_name: body.name || body.branch_name,
  branch_code: (body.code || body.branch_code)?.toUpperCase(),
  address: body.address,
  contact_email: body.contactEmail || body.contact_email || null,
  contact_phone: body.contactPhone || body.contact_phone || null,
});

// --- ROLE ---

export const mapRoleInput = (body) => ({
  name: body.name?.trim(),
  description: body.description || null,
  permissions: stringifyArray(body.permissions ?? []),
  is_system_role: body.isSystemRole || body.is_system_role || false,
});

// --- PAYMENT ---

export const mapPaymentInput = (body) => ({
  amount: Number(body.amount),
  payment_type: body.paymentType || body.payment_type,
  payment_method: body.paymentMethod || body.payment_method,
  transaction_id: body.transactionId || body.transaction_id || null,
  remarks: body.remarks || "",
  fee_id: body.feeId || refId(body.fee_record),
  student_id: body.studentId || refId(body.student),
  branch_id: body.branchId || refId(body.branch),
  collected_by_id: body.collectedById || refId(body.collected_by),
});

// --- DISCOUNT ---

export const mapDiscountUpdate = (body) => ({
  new_discount: Number(body.discount ?? 0),
});

// --- CLASS CONTENT ---

export const mapClassInput = (body, batchId) => ({
  batch_id: refId(batchId) || body.batchId || refId(body.batch),
  topic: body.topic,
  class_number: Number(body.classNumber || body.class_number || body.order_index),
  content_details: stringifyArray(
    Array.isArray(body.contentDetails || body.content_details)
      ? (body.contentDetails || body.content_details)
      : body.description
        ? [body.description]
        : [],
  ),
  date_scheduled: body.dateScheduled || body.date_scheduled ? new Date(body.dateScheduled || body.date_scheduled) : null,
  instructor_id: body.instructorId || refId(body.instructor) || null,
  is_completed: (body.isCompleted ?? body.is_completed) ?? false,
});

export const classPrismaData = (mapped) => {
  const { batch_id, instructor_id, ...rest } = mapped;
  return {
    ...rest,
    batch: { connect: { id: batch_id } },
    instructor: instructor_id ? { connect: { id: instructor_id } } : undefined,
  };
};

// --- COMMENT ---

export const mapCommentInput = (body, studentId, instructorId) => ({
  text: body.text,
  student_id: refId(studentId) || body.studentId || refId(body.student),
  instructor_id: refId(instructorId) || body.instructorId,
});
