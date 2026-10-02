import { getId, parseJsonArray } from "./common.js";
import { mapCourse } from "./course.mapper.js";

/**
 * Map a single batch from API response to UI shape.
 */
export const mapBatch = (batch) => {
  if (!batch) return batch;

  const id = batch.id;
  const startTime = batch.startTime;
  const endTime = batch.endTime;

  const mapped = {
    id,
    _id: id,
    name: batch.batchName || "",
    batch_name: batch.batchName || "", // keep original for compat
    startDate: batch.startDate,
    start_date: batch.startDate, // keep original
    scheduleDays: parseJsonArray(batch.scheduleDays),
    schedule_days: parseJsonArray(batch.scheduleDays), // keep original
    startTime,
    start_time: startTime, // keep original
    endTime,
    end_time: endTime,
    timeSlot: { start_time: startTime, end_time: endTime },
    time_slot: { start_time: startTime, end_time: endTime }, // keep original
    status: batch.status || "Upcoming",
    createdAt: batch.createdAt,
    updatedAt: batch.updatedAt,
  };

  // Map nested relations
  if (batch.course && typeof batch.course === "object") {
    mapped.course = mapCourse(batch.course);
  } else if (batch.course) {
    mapped.course = batch.course;
  }

  if (batch.branch && typeof batch.branch === "object") {
    mapped.branch = {
      id: batch.branch.id,
      _id: batch.branch.id,
      name: batch.branch.branchName,
      branch_name: batch.branch.branchName,
      branch_code: batch.branch.branchCode,
    };
  } else if (batch.branch) {
    mapped.branch = batch.branch;
  }

  // Map instructors
  if (batch.instructors) {
    mapped.instructors = batch.instructors.map((inst) => ({
      id: inst.id,
      _id: inst.id,
      full_name: inst.fullName,
      email: inst.email,
      photo_url: inst.photoUrl,
    }));
  }

  // Map students
  if (batch.students) {
    mapped.students = batch.students.map((s) => ({
      id: s.id,
      _id: s.id,
      student_name: s.studentName,
      student_id: s.studentId,
      photo_url: s.photoUrl,
    }));
  }

  // Map class contents
  if (batch.classContents) {
    const mappedClassContents = batch.classContents.map((cc) => ({
      id: cc.id,
      _id: cc.id,
      class_number: cc.classNumber,
      topic: cc.topic,
    }));
    mapped.class_contents = mappedClassContents;
    mapped.classContents = mappedClassContents;
  }

  return mapped;
};

/**
 * Map an array of batches.
 */
export const mapBatches = (batches) => (batches || []).map(mapBatch);

/**
 * Map an API list response with pagination for batches.
 */
export const mapBatchListResponse = (response) => {
  const data = response?.data || [];
  const pagination = response?.pagination || {};
  const mappedBatches = mapBatches(data);
  return {
    data: mappedBatches,
    batches: mappedBatches,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 30,
      total: pagination.total || 0,
      totalPages: pagination.totalPages || 0,
    },
  };
};
