/**
 * Api Mappers — Barrel Export
 *
 * Import all mappers from one place:
 *   import { mapStudent, mapStudents, mapCourse, mapCourses, mapBatch, mapBatches, mapFee, mapPayment } from "../api/mappers";
 */

export { getId, getImageUrl, toNumber, toDateStr, parseJsonArray } from "./common.js";

export { mapCourse, mapCourses, mapCourseListResponse } from "./course.mapper.js";

export { mapBatch, mapBatches, mapBatchListResponse } from "./batch.mapper.js";

export { mapStudent, mapStudents, mapStudentListResponse } from "./student.mapper.js";

export { mapFee, mapFees, mapPayment, mapPayments, mapStudentFinance } from "./finance.mapper.js";

export { mapBlog, mapBlogs, mapBlogListResponse } from "./blog.mapper.js";
