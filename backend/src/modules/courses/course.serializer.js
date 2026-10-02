import { serializeRecord } from "../../core/utils/serialize.js";
import { pickLocalizedField, pickLocalizedJson } from "../../core/utils/localizedFields.js";

const parseJsonArray = (value) => {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return Array.isArray(value) ? value : [];
};

export const serializeCourse = (course, lang) => {
  const obj = serializeRecord(course);
  if (!obj) return obj;

  const base = {
    id: obj.id,
    courseCode: obj.courseCode,
    slug: obj.slug,
    duration: {
      value: obj.durationValue,
      unit: obj.durationUnit || "months",
    },
    durationValue: obj.durationValue,
    durationUnit: obj.durationUnit || "months",
    baseFee: Number(obj.baseFee || 0),
    admissionFee: Number(obj.admissionFee || 0),
    firstInstallment: Number(obj.firstInstallment || 0),
    secondInstallment: Number(obj.secondInstallment || 0),
    coverImageUrl: obj.coverImageUrl || null,
    additionalInfo: parseJsonArray(obj.additionalInfo),
    isActive: obj.isActive,
    createdAt: obj.createdAt,
    updatedAt: obj.updatedAt,
  };

  if (lang) {
    return {
      ...base,
      courseName: pickLocalizedField(obj, "courseName", lang),
      shortDescription: pickLocalizedField(obj, "shortDescription", lang),
      description: pickLocalizedField(obj, "description", lang),
      publicPageStatus: obj.publicPageStatus,
    };
  }

  return {
    ...base,
    courseName: obj.courseNameEn,
    courseNameEn: obj.courseNameEn,
    courseNameBn: obj.courseNameBn || null,
    shortDescriptionEn: obj.shortDescriptionEn || null,
    shortDescriptionBn: obj.shortDescriptionBn || null,
    descriptionEn: obj.descriptionEn,
    descriptionBn: obj.descriptionBn || null,
    publicPageStatus: obj.publicPageStatus,
  };
};

export const serializeCoursePublicPage = (page, lang) => {
  if (!page) return null;
  const result = serializeRecord(page);

  if (!lang) {
    return {
      id: result.id,
      courseId: result.id,
      slug: result.slug,
      heroTitleEn: result.heroTitleEn,
      heroTitleBn: result.heroTitleBn || null,
      heroSubtitleEn: result.heroSubtitleEn || null,
      heroSubtitleBn: result.heroSubtitleBn || null,
      overviewEn: result.overviewEn || null,
      overviewBn: result.overviewBn || null,
      contentEn: result.contentEn || {},
      contentBn: result.contentBn || {},
      curriculumEn: Array.isArray(result.curriculumEn) ? result.curriculumEn : [],
      curriculumBn: Array.isArray(result.curriculumBn) ? result.curriculumBn : [],
      faqsEn: Array.isArray(result.faqsEn) ? result.faqsEn : [],
      faqsBn: Array.isArray(result.faqsBn) ? result.faqsBn : [],
      outcomesEn: Array.isArray(result.outcomesEn) ? result.outcomesEn : [],
      outcomesBn: Array.isArray(result.outcomesBn) ? result.outcomesBn : [],
      batchSlotsEn: Array.isArray(result.batchSlotsEn) ? result.batchSlotsEn : [],
      batchSlotsBn: Array.isArray(result.batchSlotsBn) ? result.batchSlotsBn : [],
      coverImageUrl: result.coverImageUrl || null,
      seoTitleEn: result.seoTitleEn || null,
      seoTitleBn: result.seoTitleBn || null,
      seoDescriptionEn: result.seoDescriptionEn || null,
      seoDescriptionBn: result.seoDescriptionBn || null,
      status: result.publicPageStatus,
      publishedAt: result.publishedAt,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  return {
    id: result.id,
    courseId: result.id,
    slug: result.slug,
    title: pickLocalizedField(result, "heroTitle", lang),
    heroTitle: pickLocalizedField(result, "heroTitle", lang),
    heroSubtitle: pickLocalizedField(result, "heroSubtitle", lang),
    overview: pickLocalizedField(result, "overview", lang),
    content: pickLocalizedJson(result, "content", lang) || {},
    curriculum: pickLocalizedJson(result, "curriculum", lang) || [],
    faqs: pickLocalizedJson(result, "faqs", lang) || [],
    outcomes: pickLocalizedJson(result, "outcomes", lang) || [],
    batchSlots: pickLocalizedJson(result, "batchSlots", lang) || [],
    coverImageUrl: result.coverImageUrl || null,
    seoTitle: pickLocalizedField(result, "seoTitle", lang),
    seoDescription: pickLocalizedField(result, "seoDescription", lang),
    status: result.publicPageStatus,
    publishedAt: result.publishedAt,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
    course: {
      id: result.id,
      courseName: pickLocalizedField(result, "courseName", lang),
      courseCode: result.courseCode,
      baseFee: Number(result.baseFee || 0),
      durationValue: result.durationValue,
      durationUnit: result.durationUnit,
    },
  };
};

export const serializeCoursePublicPages = (pages, lang) =>
  (pages || []).map((page) => serializeCoursePublicPage(page, lang));
