import { z } from "zod";

// 🚀 Helper: Safely parse strings into booleans ("false" -> false)
const booleanSchema = z.preprocess((val) => {
  if (val === "false" || val === false || val === "0" || val === 0) return false;
  if (val === "true" || val === true || val === "1" || val === 1) return true;
  return Boolean(val);
}, z.boolean());

// 🚀 Helper: Handle empty strings for numbers without making them 0
const optionalPositiveNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;
  return Number(val);
}, z.number().positive("Value must be greater than 0").optional());

const optionalNonNegativeNumber = z.preprocess((val) => {
  if (val === "" || val === null || val === undefined) return undefined;
  return Number(val);
}, z.number().min(0, "Value cannot be negative").optional());

// 🚀 Helper: Safely parse additional_info arrays
const stringArraySchema = z.preprocess((val) => {
  if (Array.isArray(val)) return val;
  if (typeof val === "string") {
    return val.trim() === "" ? [] : val.split(",").map(s => s.trim());
  }
  return [];
}, z.array(z.string()).optional().default([]));

// 🚀 Helper: Schema for nested duration object
const durationSchema = z.object({
  value: optionalPositiveNumber,
  unit: z.enum(["days", "weeks", "months", "years"]).optional()
});

export const courseCreateSchema = z.object({
  course_name: z.string().trim().min(1, "Course name is required").optional(),
  courseName: z.string().trim().min(1, "Course name is required").optional(),
  courseNameEn: z.string().trim().min(1, "English course name is required").optional(),
  courseNameBn: z.string().optional().nullable(),
  shortDescriptionEn: z.string().optional().nullable(),
  shortDescriptionBn: z.string().optional().nullable(),
  course_code: z.string().trim().min(1, "Course code is required").optional(),
  courseCode: z.string().trim().min(1, "Course code is required").optional(),
  description: z.string().optional().default(""),
  descriptionEn: z.string().optional(),
  descriptionBn: z.string().optional().nullable(),
  
  // Accept BOTH nested objects or flat keys to prevent mismatch
  duration: durationSchema.optional(),
  duration_value: optionalPositiveNumber,
  duration_unit: z.enum(["days", "weeks", "months", "years"]).optional(),
  
  base_fee: z.preprocess((val) => val === undefined ? undefined : Number(val), z.number().min(0, "Fee cannot be negative").optional()),
  baseFee: z.preprocess((val) => val === undefined ? undefined : Number(val), z.number().min(0, "Fee cannot be negative").optional()),
  admission_fee: optionalNonNegativeNumber.default(0),
  first_installment: optionalNonNegativeNumber.default(0),
  second_installment: optionalNonNegativeNumber.default(0),
  cover_image_url: z.string().optional().nullable(),
  is_active: booleanSchema.optional().default(true),
  additional_info: stringArraySchema
}).refine((data) => data.course_name || data.courseName || data.courseNameEn, {
  message: "English course name is required",
  path: ["courseNameEn"],
}).refine((data) => data.course_code || data.courseCode, {
  message: "Course code is required",
  path: ["courseCode"],
}).refine((data) => data.base_fee !== undefined || data.baseFee !== undefined, {
  message: "Fee is required",
  path: ["baseFee"],
}).transform(data => ({
  course_name: data.course_name,
  courseNameEn: data.courseNameEn || data.courseName || data.course_name,
  courseNameBn: data.courseNameBn,
  shortDescriptionEn: data.shortDescriptionEn,
  shortDescriptionBn: data.shortDescriptionBn,
  course_code: data.course_code || data.courseCode,
  description: data.description,
  descriptionEn: data.descriptionEn || data.description,
  descriptionBn: data.descriptionBn,
  // Smart merge: Prioritize nested object if exists, otherwise use flat keys
  duration: {
    value: data.duration?.value || data.duration_value,
    unit: data.duration?.unit || data.duration_unit || "months"
  },
  base_fee: data.base_fee ?? data.baseFee,
  admission_fee: data.admission_fee,
  first_installment: data.first_installment,
  second_installment: data.second_installment,
  cover_image_url: data.cover_image_url,
  is_active: data.is_active,
  additional_info: data.additional_info
}));

export const courseUpdateSchema = z.object({
  course_name: z.string().trim().min(1, "Course name cannot be empty").optional(),
  courseName: z.string().trim().min(1, "Course name cannot be empty").optional(),
  courseNameEn: z.string().trim().min(1, "English course name cannot be empty").optional(),
  courseNameBn: z.string().optional().nullable(),
  shortDescriptionEn: z.string().optional().nullable(),
  shortDescriptionBn: z.string().optional().nullable(),
  course_code: z.string().trim().min(1, "Course code cannot be empty").optional(),
  courseCode: z.string().trim().min(1, "Course code cannot be empty").optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
  descriptionBn: z.string().optional().nullable(),
  
  duration: durationSchema.optional(),
  duration_value: optionalPositiveNumber,
  duration_unit: z.enum(["days", "weeks", "months", "years"]).optional(),
  
  base_fee: optionalNonNegativeNumber,
  baseFee: optionalNonNegativeNumber,
  admission_fee: optionalNonNegativeNumber,
  first_installment: optionalNonNegativeNumber,
  second_installment: optionalNonNegativeNumber,
  cover_image_url: z.string().optional().nullable(),
  is_active: booleanSchema.optional(),
  additional_info: stringArraySchema.optional()
})
.refine(data => Object.keys(data).length > 0, {
  message: "At least one field is required to update",
})
.transform(data => {
  const result = { ...data };
  
  // Merge duration fields properly before sending to Mongoose
  if (data.duration || data.duration_value !== undefined || data.duration_unit !== undefined) {
    result.duration = result.duration || {};
    if (data.duration_value !== undefined) result.duration.value = data.duration_value;
    if (data.duration_unit !== undefined) result.duration.unit = data.duration_unit;
    
    // Clean up flat keys so they don't mess up the DB
    delete result.duration_value;
    delete result.duration_unit;
  }
  
  return result;
});

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const parseJsonPreprocess = (val) => {
  if (typeof val === "string") {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
};

const parseJsonArrayPreprocess = (val) => {
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return val;
};

export const publicPageUpsertSchema = z.object({
  locale: z.enum(["en", "bn"]).default("en"),
  slug: z.string().trim().min(1, "Slug is required")
    .regex(slugRegex, "Slug must be lowercase alphanumeric and hyphens only"),
  title: z.string().trim().min(1, "Title is required").optional(),
  heroTitleEn: z.string().trim().min(1, "English title is required").optional(),
  heroTitleBn: z.string().optional().nullable(),
  heroSubtitleEn: z.string().optional().nullable(),
  heroSubtitleBn: z.string().optional().nullable(),
  overviewEn: z.string().optional().nullable(),
  overviewBn: z.string().optional().nullable(),
  excerpt: z.string().optional().nullable(),
  content: z.preprocess(parseJsonPreprocess, z.union([z.string(), z.record(z.any()), z.array(z.any())])).optional().default(""),
  contentEn: z.preprocess(parseJsonPreprocess, z.union([z.string(), z.record(z.any()), z.array(z.any())])).optional(),
  contentBn: z.preprocess(parseJsonPreprocess, z.union([z.string(), z.record(z.any()), z.array(z.any())])).optional(),
  curriculum: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional().default([]),
  curriculumEn: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional(),
  curriculumBn: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional(),
  faqs: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional().default([]),
  faqsEn: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional(),
  faqsBn: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional(),
  outcomes: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional().default([]),
  outcomesEn: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional(),
  outcomesBn: z.preprocess(parseJsonArrayPreprocess, z.array(z.any())).optional(),
  cover_image_url: z.string().optional().nullable(),
  seo_title: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seoTitleEn: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seoTitleBn: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seo_description: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  seoDescriptionEn: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  seoDescriptionBn: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft")
}).refine((data) => data.title || data.heroTitleEn, {
  message: "English title is required",
  path: ["heroTitleEn"],
});
