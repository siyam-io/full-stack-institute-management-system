import * as svc from "./course.service.js";
import { serializeCoursePublicPage, serializeCoursePublicPages } from "./course.serializer.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getAllCourses = catchAsync(async (req, res) => { const r = await svc.fetchAll(req.query); res.json(ApiResponse.paginated("Courses", r.courses, r.pagination)); });
export const getActiveCourses = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Active courses", await svc.fetchActive())));
export const getCourseById = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Course", await svc.fetchById(req.params.id))));
export const createCourse = catchAsync(async (req, res) => res.status(201).json(new ApiResponse(201, "Created", await svc.create(req.body))));
export const updateCourse = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Updated", await svc.modify(req.params.id, req.body))));
export const toggleCourseStatus = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Toggled", await svc.toggle(req.params.id))));
export const deleteCourse = catchAsync(async (req, res) => { await svc.remove(req.params.id); res.json(new ApiResponse(200, "Deleted")); });

// --- Course Public Page Controllers ---

export const getCoursePublicPage = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const page = await svc.getPublicPageByCourseId(req.params.id, locale);
  res.json(new ApiResponse(200, "Course public page fetched", page));
});

export const updateCoursePublicPage = catchAsync(async (req, res) => {
  const locale = req.body.lang || req.body.locale || "en";
  // Handle cover image file upload path
  const bodyData = { ...req.body };
  if (req.file) {
    bodyData.cover_image_url = `/uploads/courses/${req.file.filename}`;
  }
  // Ensure array/json structures are parsed if sent as JSON-strings
  if (typeof bodyData.curriculum === "string") bodyData.curriculum = JSON.parse(bodyData.curriculum);
  if (typeof bodyData.faqs === "string") bodyData.faqs = JSON.parse(bodyData.faqs);
  if (typeof bodyData.outcomes === "string") bodyData.outcomes = JSON.parse(bodyData.outcomes);
  if (typeof bodyData.contentEn === "string") bodyData.contentEn = JSON.parse(bodyData.contentEn);
  if (typeof bodyData.contentBn === "string") bodyData.contentBn = JSON.parse(bodyData.contentBn);
  if (typeof bodyData.curriculumEn === "string") bodyData.curriculumEn = JSON.parse(bodyData.curriculumEn);
  if (typeof bodyData.curriculumBn === "string") bodyData.curriculumBn = JSON.parse(bodyData.curriculumBn);
  if (typeof bodyData.faqsEn === "string") bodyData.faqsEn = JSON.parse(bodyData.faqsEn);
  if (typeof bodyData.faqsBn === "string") bodyData.faqsBn = JSON.parse(bodyData.faqsBn);
  if (typeof bodyData.outcomesEn === "string") bodyData.outcomesEn = JSON.parse(bodyData.outcomesEn);
  if (typeof bodyData.outcomesBn === "string") bodyData.outcomesBn = JSON.parse(bodyData.outcomesBn);

  const page = await svc.upsertPublicPage(req.params.id, locale, bodyData);
  res.json(new ApiResponse(200, "Course public page updated", page));
});

export const updateCoursePublicPageStatus = catchAsync(async (req, res) => {
  const locale = req.body.lang || req.body.locale || "en";
  const status = req.body.status || "draft";
  const page = await svc.updatePublicPageStatus(req.params.id, locale, status);
  res.json(new ApiResponse(200, `Public page status updated to ${status}`, page));
});

export const getPublicCourses = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const pages = await svc.getPublicCourses(locale);
  res.json(new ApiResponse(200, "Public courses fetched", pages));
});

export const getPublicCourseBySlug = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const page = await svc.getPublicCourseBySlug(req.params.slug, locale);
  res.json(new ApiResponse(200, "Public course details fetched", page));
});
