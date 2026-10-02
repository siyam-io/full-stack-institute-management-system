import * as repo from "./cms.repository.js";
import {
  serializeSection,
  serializeSectionTranslation,
  serializeTestimonial,
  serializeTestimonials,
  serializeTeamMember,
  serializeTeamMembers,
} from "./cms.serializer.js";
import AppError from "../../core/errors/AppError.js";

// ─── Section Services ───

export const getAllSections = async () => {
  const sections = await repo.findAllSections();
  return sections.map(serializeSection);
};

export const getSectionTranslation = async (sectionKey, locale) => {
  const row = await repo.findSectionTranslation(sectionKey);
  if (!row) return null;
  return serializeSectionTranslation(row, locale);
};

export const getSectionTranslationPublic = async (sectionKey, locale) => {
  const row = await repo.findSectionTranslationFallback(sectionKey);
  return serializeSectionTranslation(row, locale);
};

const SECTION_SEEDS = {
  home_hero: { pageKey: "home", title: "Home Hero" },
  professional_chef_course: { pageKey: "home", title: "Professional Chef Course" },
  student_testimonials: { pageKey: "home", title: "Student Testimonials" },
  strategic_team: { pageKey: "about", title: "Strategic Team" },
  course_page: { pageKey: "courses", title: "Course Page" },
  blog_page: { pageKey: "blog", title: "Blog Page" },
};

export const upsertSectionTranslation = async (sectionKey, locale, data) => {
  // Auto-seed section if it doesn't exist
  const seed = SECTION_SEEDS[sectionKey];
  if (seed) {
    await repo.seedSection(sectionKey, seed.pageKey, seed.title);
  }

  // Build safe payload without mutating input
  const payload = { ...data };

  // Auto-set published_at if status becomes published and not already set
  if (payload.status === "published") {
    const existing = await repo.findSectionTranslation(sectionKey);
    if (!existing || !existing.published_at) {
      payload.published_at = payload.published_at || new Date().toISOString();
    }
  }

  const row = await repo.upsertSectionTranslation(sectionKey, locale, payload);
  return serializeSectionTranslation(row, locale);
};

// ─── Testimonial Services ───

export const getAllTestimonials = async (locale) => {
  const rows = await repo.findAllTestimonials();
  return serializeTestimonials(rows, locale);
};

export const getPublicTestimonials = async (locale) => {
  const rows = await repo.findPublicTestimonials();
  return serializeTestimonials(rows, locale);
};

export const getTestimonialById = async (id) => {
  const row = await repo.findTestimonialById(id);
  if (!row) throw new AppError("Testimonial not found", 404);
  return serializeTestimonial(row);
};

export const createTestimonial = async (data) => {
  const row = await repo.createTestimonial(data);
  return serializeTestimonial(row, data.locale || "en");
};

export const updateTestimonial = async (id, data) => {
  const existing = await repo.findTestimonialById(id);
  if (!existing) throw new AppError("Testimonial not found", 404);
  const row = await repo.updateTestimonial(id, data);
  return serializeTestimonial(row, data.locale || "en");
};

export const deleteTestimonial = async (id) => {
  const existing = await repo.findTestimonialById(id);
  if (!existing) throw new AppError("Testimonial not found", 404);
  await repo.deleteTestimonial(id);
};

// ─── Team Member Services ───

export const getAllTeamMembers = async (locale) => {
  const rows = await repo.findAllTeamMembers();
  return serializeTeamMembers(rows, locale);
};

export const getPublicTeamMembers = async (locale) => {
  const rows = await repo.findPublicTeamMembers();
  return serializeTeamMembers(rows, locale);
};

export const getTeamMemberById = async (id) => {
  const row = await repo.findTeamMemberById(id);
  if (!row) throw new AppError("Team member not found", 404);
  return serializeTeamMember(row);
};

export const createTeamMember = async (data) => {
  const row = await repo.createTeamMember(data);
  return serializeTeamMember(row, data.locale || "en");
};

export const updateTeamMember = async (id, data) => {
  const existing = await repo.findTeamMemberById(id);
  if (!existing) throw new AppError("Team member not found", 404);
  const row = await repo.updateTeamMember(id, data);
  return serializeTeamMember(row, data.locale || "en");
};

export const deleteTeamMember = async (id) => {
  const existing = await repo.findTeamMemberById(id);
  if (!existing) throw new AppError("Team member not found", 404);
  await repo.deleteTeamMember(id);
};
