/**
 * Serialization Layer
 * Converts Prisma records into old Mongoose/frontend-compatible shapes.
 *
 * Rules:
 * - Every object gets both `id` and `_id` as same string.
 * - Dates become ISO strings.
 * - Decimal becomes JS number.
 * - BigInt becomes string.
 * - `null` remains `null`; missing arrays become `[]`.
 * - Remove password unless explicitly needed by auth comparison.
 * - Relation foreign keys can stay as extra fields, but old names must exist.
 */

// --- BASE HELPERS ---

// SQLite stores arrays as JSON strings; parse them back for frontend compatibility
const parseJsonArray = (value) => {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch { /* not JSON, return as-is */ }
  }
  return value;
};

export const toPlain = (value) => {
  if (value === null || value === undefined) return value;
  if (typeof value === "bigint") return value.toString();
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "object" && typeof value.toNumber === "function") return value.toNumber();
  if (Array.isArray(value)) return value.map(toPlain);
  if (typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, toPlain(v)]));
  }
  return value;
};

export const withMongoId = (record) => {
  if (!record) return record;
  const obj = toPlain(record);
  if (obj.id && !obj._id) obj._id = obj.id;
  return obj;
};

// --- ENTITY SERIALIZERS ---

export const serializeRole = (role) => {
  const obj = withMongoId(role);
  if (!obj) return obj;
  // SQLite stores permissions as JSON string, parse to array
  obj.permissions = parseJsonArray(obj.permissions);
  return obj;
};

export const serializeBranch = (branch) => withMongoId(branch);

export const serializeCourse = (course) => {
  const obj = withMongoId(course);
  if (!obj) return obj;
  obj.additional_info = parseJsonArray(obj.additional_info);
  obj.duration = {
    value: obj.duration_value,
    unit: obj.duration_unit,
  };
  return obj;
};

export const serializeUser = (user) => {
  const obj = withMongoId(user);
  if (!obj) return obj;
  delete obj.password;
  obj.social_links = {
    facebook: obj.facebook || "",
    linkedin: obj.linkedin || "",
    twitter: obj.twitter || "",
    instagram: obj.instagram || "",
    custom: obj.custom || "",
  };
  if (obj.role && typeof obj.role === "object") obj.role = serializeRole(obj.role);
  if (obj.branch && typeof obj.branch === "object") obj.branch = withMongoId(obj.branch);
  return obj;
};

export const serializeBatch = (batch) => {
  const obj = withMongoId(batch);
  if (!obj) return obj;
  obj.schedule_days = parseJsonArray(obj.schedule_days);
  obj.time_slot = {
    start_time: obj.start_time,
    end_time: obj.end_time,
  };
  if (obj.course && typeof obj.course === "object") obj.course = serializeCourse(obj.course);
  if (obj.branch && typeof obj.branch === "object") obj.branch = withMongoId(obj.branch);
  if (obj.instructors) obj.instructors = obj.instructors.map(serializeUser);
  if (obj.students) obj.students = obj.students.map(withMongoId);
  if (obj.classContents && !obj.class_contents)
    obj.class_contents = obj.classContents.map(withMongoId);
  return obj;
};

export const serializeStudent = (student) => {
  const obj = withMongoId(student);
  if (!obj) return obj;
  if (obj.course && typeof obj.course === "object") obj.course = serializeCourse(obj.course);
  if (obj.batch && typeof obj.batch === "object") obj.batch = serializeBatch(obj.batch);
  if (obj.branch && typeof obj.branch === "object") obj.branch = withMongoId(obj.branch);
  return obj;
};

export const serializeFee = (fee) => {
  const obj = withMongoId(fee);
  if (!obj) return obj;
  if (obj.student && typeof obj.student === "object") obj.student = withMongoId(obj.student);
  if (obj.course && typeof obj.course === "object") obj.course = withMongoId(obj.course);
  if (obj.branch && typeof obj.branch === "object") obj.branch = withMongoId(obj.branch);
  if (obj.discountHistory) {
    obj.discount_history = obj.discountHistory.map((dh) => ({
      previous_discount: dh.previous_discount,
      new_discount: dh.new_discount,
      updated_at: dh.updated_at instanceof Date ? dh.updated_at.toISOString() : dh.updated_at,
      updated_by: withMongoId(dh.updated_by),
    }));
    delete obj.discountHistory;
  }
  return obj;
};

export const serializePayment = (payment) => {
  const obj = withMongoId(payment);
  if (!obj) return obj;
  // Rename Prisma camelCase to old Mongoose names
  if (payment.fee_record && typeof payment.fee_record === "object") {
    obj.fee_record = serializeFee(payment.fee_record);
  } else if (obj.feeId && !obj.fee_record) {
    obj.fee_record = obj.feeId;
  }
  if (payment.student && typeof payment.student === "object") {
    obj.student = withMongoId(payment.student);
  }
  if (payment.collected_by && typeof payment.collected_by === "object") {
    obj.collected_by = serializeUser(payment.collected_by);
  } else if (obj.collectedById && !obj.collected_by) {
    obj.collected_by = obj.collectedById;
  }
  if (payment.branch && typeof payment.branch === "object") {
    obj.branch = withMongoId(payment.branch);
  }
  return obj;
};

export const serializeClassContent = (cc) => {
  const obj = withMongoId(cc);
  if (!obj) return obj;
  obj.content_details = parseJsonArray(obj.content_details);
  if (obj.batch && typeof obj.batch === "object") obj.batch = withMongoId(obj.batch);
  if (obj.instructor && typeof obj.instructor === "object")
    obj.instructor = serializeUser(obj.instructor);
  if (obj.attendance) {
    obj.attendance = obj.attendance.map((a) => ({
      student: withMongoId(a.student),
      status: a.status,
    }));
  }
  return obj;
};

export const serializeComment = (comment) => {
  const obj = withMongoId(comment);
  if (!obj) return obj;
  if (obj.student && typeof obj.student === "object") obj.student = withMongoId(obj.student);
  if (obj.instructor && typeof obj.instructor === "object")
    obj.instructor = serializeUser(obj.instructor);
  return obj;
};

export const serializeExpense = (expense) => {
  const obj = withMongoId(expense);
  if (!obj) return obj;
  if (expense.class_content && typeof expense.class_content === "object") {
    obj.class_content = withMongoId(expense.class_content);
  }
  if (expense.batch && typeof expense.batch === "object") {
    obj.batch = withMongoId(expense.batch);
  }
  if (expense.branch && typeof expense.branch === "object") {
    obj.branch = withMongoId(expense.branch);
  }
  if (expense.recorded_by && typeof expense.recorded_by === "object") {
    obj.recorded_by = serializeUser(expense.recorded_by);
  }
  return obj;
};

export const serializeInventory = (inv) => {
  const obj = withMongoId(inv);
  if (!obj) return obj;
  if (inv.branch && typeof inv.branch === "object") obj.branch = withMongoId(inv.branch);
  return obj;
};

export const serializeRequisition = (req) => {
  const obj = withMongoId(req);
  if (!obj) return obj;
  if (req.class_content && typeof req.class_content === "object") {
    obj.class_content = serializeClassContent(req.class_content);
  }
  if (req.batch && typeof req.batch === "object") obj.batch = serializeBatch(req.batch);
  if (req.branch && typeof req.branch === "object") obj.branch = withMongoId(req.branch);
  if (req.requested_by && typeof req.requested_by === "object")
    obj.requested_by = serializeUser(req.requested_by);
  if (req.approved_by && typeof req.approved_by === "object")
    obj.approved_by = serializeUser(req.approved_by);
  if (obj.items) {
    obj.items = obj.items.map((item) => {
      const i = withMongoId(item);
      if (item.inventory_item && typeof item.inventory_item === "object") {
        i.inventory_item = serializeInventory(item.inventory_item);
      }
      return i;
    });
  }
  return obj;
};

export const serializeStockTransaction = (txn) => {
  const obj = withMongoId(txn);
  if (!obj) return obj;
  if (txn.inventory_item && typeof txn.inventory_item === "object")
    obj.inventory_item = serializeInventory(txn.inventory_item);
  if (txn.branch && typeof txn.branch === "object") obj.branch = withMongoId(txn.branch);
  if (txn.performed_by && typeof txn.performed_by === "object")
    obj.performed_by = serializeUser(txn.performed_by);
  if (txn.requested_by && typeof txn.requested_by === "object")
    obj.requested_by = serializeUser(txn.requested_by);
  if (txn.requisition && typeof txn.requisition === "object")
    obj.requisition = withMongoId(txn.requisition);
  if (txn.reference_class && typeof txn.reference_class === "object")
    obj.reference_class = serializeClassContent(txn.reference_class);
  return obj;
};

export const serializeMasterSyllabus = (ms) => withMongoId(ms);

export const serializeHoliday = (h) => withMongoId(h);
