import * as repo from "./course.repository.js";
import * as publicPageRepo from "./course.repository.js";
import { serializeCourse, serializeCoursePublicPage, serializeCoursePublicPages } from "./course.serializer.js";
import AppError from "../../core/errors/AppError.js";
import { query } from "../../core/db/sqlHelpers.js";

export const create = (d) => repo.create(d).then(serializeCourse);
export const modify = async (id, d) => { const e = await repo.findById(id); if (!e) throw new AppError("Course not found", 404); return repo.update(id, d).then(serializeCourse); };
export const remove = async (id) => { const c = await repo.findById(id); if (!c) throw new AppError("Course not found", 404); await repo.remove(id); };
export const toggle = async (id) => { const c = await repo.findById(id); if (!c) throw new AppError("Course not found", 404); return repo.update(id, { is_active: !c.is_active }).then(serializeCourse); };

export const fetchAll = async (query) => {
  const page = parseInt(query.page) || 1, limit = parseInt(query.limit) || 30;
  const filters = {};
  if (query.search) filters.search = query.search;
  if (query.is_active !== undefined) filters.is_active = query.is_active === "true";
  const skip = (page - 1) * limit;
  const filtersWithPagination = { ...filters, limit, skip };
  const [courses, total] = await Promise.all([repo.findCourses(filtersWithPagination), repo.countCourses(filters)]);
  return { courses: courses.map(serializeCourse), pagination: { total, page, limit, totalPages: Math.ceil(total / limit) } };
};

export const fetchActive = () => repo.findActive().then((r) => r.map(serializeCourse));
export const fetchById = async (id) => { const c = await repo.findById(id); if (!c) throw new AppError("Course not found", 404); return serializeCourse(c); };

// --- Public Page Operations ---

export const getPublicPageByCourseId = async (courseId, locale) => {
  const page = await publicPageRepo.findPublicPageByCourseId(courseId);
  return serializeCoursePublicPage(page);
};

export const upsertPublicPage = async (courseId, locale, data) => {
  const course = await repo.findById(courseId);
  if (!course) throw new AppError("Course not found", 404);

  const updatedData = { ...data };

  // Set published_at if status becomes published and was empty
  if (data.status === "published") {
    const existing = await publicPageRepo.findPublicPageByCourseId(courseId);
    if (!existing || !existing.published_at) {
      updatedData.published_at = new Date();
    }
  }

  const page = await publicPageRepo.upsertPublicPage(courseId, locale, updatedData);
  return serializeCoursePublicPage(page);
};

export const updatePublicPageStatus = async (courseId, locale, status) => {
  const existing = await publicPageRepo.findPublicPageByCourseId(courseId);
  if (!existing) throw new AppError("Public page configuration not found", 404);

  const publishedAt = status === "published" && !existing.published_at ? new Date() : null;
  const page = await publicPageRepo.updateStatus(courseId, status, publishedAt);
  return serializeCoursePublicPage(page);
};

export const getPublicCourses = async (locale) => {
  const pages = await publicPageRepo.findActivePublicPages();
  if (!pages || pages.length === 0) return [];

  const courseIds = pages.map(p => p.id);
  const activeBatches = await query`
    SELECT * FROM "batches"
    WHERE course_id = ANY(CAST(${courseIds} AS uuid[]))
      AND deleted_at IS NULL
      AND status IN ('Upcoming', 'Active', 'enrolling', 'Upcoming (আসন্ন)', 'Enrolling (ভর্তি চলছে)')
    ORDER BY start_date ASC
  `;

  const batchesByCourse = {};
  (activeBatches || []).forEach(b => {
    if (!batchesByCourse[b.course_id]) {
      batchesByCourse[b.course_id] = [];
    }
    batchesByCourse[b.course_id].push(b);
  });

  const serialized = serializeCoursePublicPages(pages, locale || "en");

  return serialized.map(s => {
    const courseBatches = batchesByCourse[s.id] || [];
    let schedule = locale === "bn" ? "ফ্লেক্সিবল" : "Flexible";
    if (courseBatches.length > 0) {
      const b = courseBatches[0];
      const days = (locale === "bn" ? (b.class_days_bn || (Array.isArray(b.schedule_days) ? b.schedule_days.join("-") : b.schedule_days)) : (Array.isArray(b.schedule_days) ? b.schedule_days.join("-") : b.schedule_days)) || "";
      const time = (locale === "bn" ? (b.class_time_bn || `${b.start_time} - ${b.end_time}`) : `${b.start_time} - ${b.end_time}`) || "";
      schedule = `${days} (${time})`;
    }
    return {
      ...s,
      schedule
    };
  });
};

export const getPublicCourseBySlug = async (slug, locale) => {
  const page = await publicPageRepo.findPublicPageBySlug(slug);
  if (!page || page.public_page_status !== "published" || !page.is_active) {
    throw new AppError("Course public page not found or not published", 404);
  }

  // Fetch actual operational database batches for this course
  const activeBatches = await query`
    SELECT * FROM "batches"
    WHERE course_id = CAST(${page.id} AS uuid)
      AND deleted_at IS NULL
      AND status IN ('Upcoming', 'Active', 'enrolling', 'Upcoming (আসন্ন)', 'Enrolling (ভর্তি চলছে)')
    ORDER BY start_date ASC
  `;

  const serialized = serializeCoursePublicPage(page, locale || "en");
  
  // Format batches to the format that BatchSelector expects
  serialized.batchSlots = (activeBatches || []).map(b => ({
    id: b.id,
    name: (locale === "bn" ? (b.batch_name_bn || b.batch_name) : b.batch_name) || "",
    days: (locale === "bn" ? (b.class_days_bn || (Array.isArray(b.schedule_days) ? b.schedule_days.join("-") : b.schedule_days)) : (Array.isArray(b.schedule_days) ? b.schedule_days.join("-") : b.schedule_days)) || "",
    time: (locale === "bn" ? (b.class_time_bn || b.class_time_en) : (b.class_time_en || b.class_time_bn)) || "",
    duration: (locale === "bn" ? (b.duration_bn || b.duration_en || "৩ মাস") : (b.duration_en || "3 Months")) || "",
    totalClasses: b.total_classes || 36,
    status: b.status?.toLowerCase() === "upcoming" ? "upcoming" : (b.status?.toLowerCase() === "full" ? "full" : "enrolling"),
    badge: (locale === "bn" ? (b.badge_bn || "সীমিত আসন") : (b.badge_en || "Limited Seats")) || "",
  }));

  return serialized;
};
