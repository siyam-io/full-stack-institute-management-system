import { getId, toNumber, parseJsonArray } from "./common.js";

/**
 * Map a single course from API response to UI shape.
 */
export const mapCourse = (course) => {
  if (!course) return course;

  const id = course.id;
  const durationValue = Number(course.durationValue || 0);
  const durationUnit = course.durationUnit || "months";

  return {
    id,
    _id: id,
    name: course.courseName || "",
    code: course.courseCode || "",
    durationValue,
    durationUnit,
    baseFee: toNumber(course.baseFee),
    additionalInfo: parseJsonArray(course.additionalInfo),
    description: course.description || "",
    isActive: course.isActive !== undefined ? course.isActive : true,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    publicPageStatus: course.publicPageStatus || null,
    // Keep original flat fields for backwards compat
    course_name: course.courseName || "",
    course_code: course.courseCode || "",
    duration_value: durationValue,
    duration_unit: durationUnit,
    duration: { value: durationValue, unit: durationUnit },
    base_fee: toNumber(course.baseFee),
    additional_info: parseJsonArray(course.additionalInfo),
    is_active: course.isActive !== undefined ? course.isActive : true,
  };
};

/**
 * Map an array of courses.
 */
export const mapCourses = (courses) => (courses || []).map(mapCourse);

/**
 * Map an API list response (with pagination) for courses.
 */
export const mapCourseListResponse = (response) => {
  const data = response?.data || [];
  const pagination = response?.pagination || {};
  const mappedCourses = mapCourses(data);
  return {
    data: mappedCourses,
    courses: mappedCourses,
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 30,
      total: pagination.total || 0,
      totalPages: pagination.totalPages || 0,
    },
  };
};
