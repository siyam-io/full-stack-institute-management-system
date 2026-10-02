/**
 * Input Mapping Layer
 * Converts frontend/Mongo-shaped request payloads into Prisma-compatible data objects.
 *
 * Rule: Never require frontend to send `courseId`, `batchId`, `branchId`, `roleId`.
 * Always extract ObjectId from `body.course`, `body.batch`, `body.branch`, `body.role` using refId().
 */

// SQLite stores arrays as JSON strings; stringify arrays for storage
const stringifyArray = (value) => {
  if (Array.isArray(value)) return JSON.stringify(value);
  return value;
};

export const refId = (value) => {
  if (!value) return value;
  if (typeof value === "string") return value;
  return value._id || value.id;
};

// --- COURSE ---

export const mapCourseInput = (body) => ({
  course_name: body.course_name,
  course_code: body.course_code?.toUpperCase(),
  duration_value: Number(body.duration?.value ?? body.duration_value),
  duration_unit: body.duration?.unit ?? body.duration_unit ?? "months",
  base_fee: Number(body.base_fee ?? 0),
  additional_info: stringifyArray(body.additional_info ?? []),
  description: body.description ?? "",
});

export const coursePrismaData = (mapped) => mapped;

// --- BATCH ---

export const mapBatchInput = (body) => ({
  batch_name: body.batch_name,
  start_date: new Date(body.start_date),
  schedule_days: stringifyArray(body.schedule_days ?? []),
  start_time: body.time_slot?.start_time ?? body.start_time,
  end_time: body.time_slot?.end_time ?? body.end_time,
  status: body.status ?? "Upcoming",
  courseId: refId(body.course),
  branchId: refId(body.branch),
  instructorIds: (body.instructors ?? []).map((x) => refId(x)),
});

export const batchPrismaData = (mapped) => ({
  batch_name: mapped.batch_name,
  start_date: mapped.start_date,
  schedule_days: mapped.schedule_days,
  start_time: mapped.start_time,
  end_time: mapped.end_time,
  status: mapped.status,
  course: { connect: { id: mapped.courseId } },
  branch: { connect: { id: mapped.branchId } },
  instructors: { set: mapped.instructorIds.map((id) => ({ id })) },
});

// --- STUDENT ---

export const mapStudentInput = (body, file) => {
  const data = {
    student_name: body.student_name,
    fathers_name: body.fathers_name,
    student_id: body.student_id,
    registration_number: body.registration_number || null,
    competency: body.competency || "not_assessed",
    status: body.status || "active",
    is_active: body.is_active !== undefined ? body.is_active === true || body.is_active === "true" : true,
    is_verified: body.is_verified !== undefined ? body.is_verified === true || body.is_verified === "true" : false,
    issue_date: new Date(body.issue_date),
    completion_date: body.completion_date ? new Date(body.completion_date) : null,
    gender: body.gender,
    contact_number: body.contact_number || null,
    email: body.email || null,
    address: body.address || null,
    courseId: refId(body.course),
    batchId: refId(body.batch),
    branchId: refId(body.branch),
  };
  if (file) data.photo_url = `/uploads/students/${file.filename}`;
  return data;
};

export const studentPrismaData = (mapped) => {
  const { courseId, batchId, branchId, ...rest } = mapped;
  return {
    ...rest,
    course: { connect: { id: courseId } },
    batch: { connect: { id: batchId } },
    branch: { connect: { id: branchId } },
  };
};

// --- USER (EMPLOYEE) ---

export const mapUserInput = (body, file) => {
  const data = {
    username: body.username,
    email: body.email?.toLowerCase(),
    password: body.password,
    employee_id: body.employee_id,
    full_name: body.full_name,
    phone: body.phone || undefined,
    designation: body.designation || "Staff",
    department: body.department || "General",
    joining_date: body.joining_date ? new Date(body.joining_date) : new Date(),
    status: body.status || "Active",
    facebook: body.facebook || body.social_links?.facebook || "",
    linkedin: body.linkedin || body.social_links?.linkedin || "",
    twitter: body.twitter || body.social_links?.twitter || "",
    instagram: body.instagram || body.social_links?.instagram || "",
    custom: body.custom || body.others || body.social_links?.custom || "",
    roleId: refId(body.role),
    branchId: refId(body.branch),
  };
  if (file) data.photo_url = `/uploads/employees/${file.filename}`;
  if (!data.password || data.password === "") delete data.password;
  return data;
};

export const userPrismaData = (mapped) => {
  const { roleId, branchId, ...rest } = mapped;
  return {
    ...rest,
    role: { connect: { id: roleId } },
    branch: { connect: { id: branchId } },
  };
};

// --- BRANCH ---

export const mapBranchInput = (body) => ({
  branch_name: body.branch_name,
  branch_code: body.branch_code?.toUpperCase(),
  address: body.address,
  contact_email: body.contact_email || null,
  contact_phone: body.contact_phone || null,
});

// --- ROLE ---

export const mapRoleInput = (body) => ({
  name: body.name?.trim(),
  description: body.description || null,
  permissions: stringifyArray(body.permissions ?? []),
  is_system_role: body.is_system_role ?? false,
});

// --- PAYMENT ---

export const mapPaymentInput = (body) => ({
  amount: Number(body.amount),
  payment_type: body.payment_type,
  payment_method: body.payment_method,
  transaction_id: body.transaction_id || null,
  remarks: body.remarks || "",
  feeId: refId(body.fee_record),
  studentId: refId(body.student),
  branchId: refId(body.branch),
  collectedById: refId(body.collected_by),
});

// --- DISCOUNT ---

export const mapDiscountUpdate = (body) => ({
  new_discount: Number(body.discount ?? 0),
});

// --- CLASS CONTENT ---

export const mapClassInput = (body, batchId) => ({
  batchId: refId(batchId) || refId(body.batch),
  topic: body.topic,
  class_number: Number(body.class_number || body.order_index),
  content_details: stringifyArray(
    Array.isArray(body.content_details)
      ? body.content_details
      : body.description
        ? [body.description]
        : [],
  ),
  date_scheduled: body.date_scheduled ? new Date(body.date_scheduled) : null,
  instructorId: refId(body.instructor) || null,
  is_completed: body.is_completed ?? false,
});

export const classPrismaData = (mapped) => {
  const { batchId, instructorId, ...rest } = mapped;
  return {
    ...rest,
    batch: { connect: { id: batchId } },
    instructor: instructorId ? { connect: { id: instructorId } } : undefined,
  };
};

// --- ATTENDANCE ---

export const mapAttendanceInput = (body) => ({
  attendanceRecords: (body.attendanceRecords || body.attendance || []).map((a) => ({
    studentId: refId(a.student),
    status: a.status,
  })),
  instructorId: refId(body.instructorId) || refId(body.instructor),
  is_completed: body.is_completed ?? true,
  financials: body.financials || undefined,
});

// --- REQUISITION ---

export const mapRequisitionInput = (body) => ({
  classContentId: refId(body.class_content),
  batchId: refId(body.batch),
  branchId: refId(body.branch),
  items: (body.items || []).map((item) => ({
    item_name: item.item_name,
    quantity: Number(item.quantity),
    unit: item.unit,
    is_custom: item.is_custom ?? false,
    inventoryItemId: refId(item.inventory_item),
  })),
});

export const requisitionPrismaData = (mapped) => {
  const { classContentId, batchId, branchId, items, ...rest } = mapped;
  return {
    ...rest,
    items: {
      create: items.map((item) => {
        const { inventoryItemId, ...itemRest } = item;
        return {
          ...itemRest,
          inventory_item: inventoryItemId ? { connect: { id: inventoryItemId } } : undefined,
        };
      }),
    },
    class_content: { connect: { id: classContentId } },
    batch: { connect: { id: batchId } },
    branch: { connect: { id: branchId } },
  };
};

export const mapRequisitionAction = (body) => ({
  items: body.items || undefined,
  admin_note: body.admin_note || "",
});

// --- INVENTORY PURCHASE ---

export const mapInventoryPurchase = (body) => ({
  items: (body.items || []).map((item) => ({
    item_name: item.item_name,
    category: item.category || "Other",
    unit: item.unit,
    quantity: Number(item.quantity),
    total_price: Number(item.total_price),
  })),
  total_cost: Number(body.total_cost ?? 0),
  supplier: body.supplier || null,
  notes: body.notes || null,
});

// --- MASTER SYLLABUS ---

export const mapMasterSyllabusInput = (body) => ({
  topic: body.topic,
  order_index: Number(body.order_index),
  class_type: body.class_type || "Lecture",
  description: body.description || null,
  category: body.category || "General",
});

// --- HOLIDAY ---

export const mapHolidayInput = (body) => ({
  title: body.title,
  date_string: body.date_string,
  is_active: body.is_active ?? true,
});

// --- COMMENT ---

export const mapCommentInput = (body, studentId, instructorId) => ({
  text: body.text,
  studentId: refId(studentId) || refId(body.student),
  instructorId: refId(instructorId),
});
