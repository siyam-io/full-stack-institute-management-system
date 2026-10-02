import { serializeRecord } from "../../core/utils/serialize.js";
import { pickLocalizedField, pickLocalizedJson } from "../../core/utils/localizedFields.js";

export const serializeSection = (section) => {
  if (!section) return null;
  return serializeRecord(section);
};

export const serializeSectionTranslation = (row, lang) => {
  if (!row) return null;
  const obj = serializeRecord(row);
  const publicMode = Boolean(lang);

  if (!publicMode) {
    return {
      id: obj.id,
      sectionKey: obj.sectionKey,
      pageKey: obj.pageKey,
      sectionTitle: obj.title,
      dataEn: obj.dataEn || {},
      dataBn: obj.dataBn || {},
      seoTitleEn: obj.seoTitleEn || null,
      seoTitleBn: obj.seoTitleBn || null,
      seoDescriptionEn: obj.seoDescriptionEn || null,
      seoDescriptionBn: obj.seoDescriptionBn || null,
      status: obj.status,
      publishedAt: obj.publishedAt || null,
      isActive: obj.isActive,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }

  return {
    id: obj.id,
    sectionKey: obj.sectionKey,
    pageKey: obj.pageKey,
    sectionTitle: obj.title,
    data: pickLocalizedJson(obj, "data", lang) || {},
    seoTitle: pickLocalizedField(obj, "seoTitle", lang),
    seoDescription: pickLocalizedField(obj, "seoDescription", lang),
    status: obj.status,
    publishedAt: obj.publishedAt || null,
    isActive: obj.isActive,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const serializeTestimonial = (row, lang) => {
  if (!row) return null;
  const obj = serializeRecord(row);

  if (!lang) {
    return {
      id: obj.id,
      studentNameEn: obj.studentNameEn,
      studentNameBn: obj.studentNameBn || null,
      designationEn: obj.designationEn || null,
      designationBn: obj.designationBn || null,
      messageEn: obj.messageEn,
      messageBn: obj.messageBn || null,
      imageUrl: obj.imageUrl || null,
      videoUrl: obj.videoUrl || null,
      rating: obj.rating || null,
      sortOrder: obj.sortOrder,
      isActive: obj.isActive,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }

  return {
    id: obj.id,
    studentName: pickLocalizedField(obj, "studentName", lang),
    designation: pickLocalizedField(obj, "designation", lang),
    message: pickLocalizedField(obj, "message", lang),
    imageUrl: obj.imageUrl || null,
    videoUrl: obj.videoUrl || null,
    rating: obj.rating || null,
    sortOrder: obj.sortOrder,
    isActive: obj.isActive,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const serializeTestimonials = (rows, lang) => (rows || []).map((row) => serializeTestimonial(row, lang));

export const serializeTeamMember = (row, lang) => {
  if (!row) return null;
  const obj = serializeRecord(row);

  if (!lang) {
    return {
      id: obj.id,
      userId: obj.userId || obj.user_id || null,
      nameEn: obj.nameEn,
      nameBn: obj.nameBn || null,
      designationEn: obj.designationEn,
      designationBn: obj.designationBn || null,
      bioEn: obj.bioEn || null,
      bioBn: obj.bioBn || null,
      imageUrl: obj.imageUrl || null,
      facebook: obj.facebook || null,
      linkedin: obj.linkedin || null,
      sortOrder: obj.sortOrder,
      isActive: obj.isActive,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }

  return {
    id: obj.id,
    userId: obj.userId || obj.user_id || null,
    name: pickLocalizedField(obj, "name", lang),
    designation: pickLocalizedField(obj, "designation", lang),
    bio: pickLocalizedField(obj, "bio", lang),
    imageUrl: obj.imageUrl || null,
    facebook: obj.facebook || null,
    linkedin: obj.linkedin || null,
    sortOrder: obj.sortOrder,
    isActive: obj.isActive,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };
};

export const serializeTeamMembers = (rows, lang) => (rows || []).map((row) => serializeTeamMember(row, lang));
