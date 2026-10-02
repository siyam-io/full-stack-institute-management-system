import { z } from "zod";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const blogCreateSchema = z.object({
  title: z.string().trim().min(1, "Title is required").optional(),
  titleEn: z.string().trim().min(1, "English title is required").optional(),
  titleBn: z.string().optional().nullable(),
  slug: z.string().trim().min(1, "Slug is required")
    .regex(slugRegex, "Slug must be lowercase alphanumeric and hyphens only (e.g. how-to-become-chef)"),
  excerpt: z.string().optional().nullable(),
  excerptEn: z.string().optional().nullable(),
  excerptBn: z.string().optional().nullable(),
  content: z.union([z.string(), z.record(z.any()), z.array(z.any())]).optional().default(""),
  contentEn: z.union([z.string(), z.record(z.any()), z.array(z.any())]).optional(),
  contentBn: z.union([z.string(), z.record(z.any()), z.array(z.any())]).optional(),
  cover_image_url: z.string().optional().nullable(),
  tags: z.preprocess((val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      return val.trim() === "" ? [] : val.split(",").map(s => s.trim());
    }
    return [];
  }, z.array(z.string())).optional().default([]),
  seo_title: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seoTitleEn: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seoTitleBn: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seo_description: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  seoDescriptionEn: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  seoDescriptionBn: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).default("draft")
}).refine((data) => data.title || data.titleEn, {
  message: "English title is required",
  path: ["titleEn"],
});

export const blogUpdateSchema = z.object({
  title: z.string().trim().min(1, "Title cannot be empty").optional(),
  titleEn: z.string().trim().min(1, "English title cannot be empty").optional(),
  titleBn: z.string().optional().nullable(),
  slug: z.string().trim().min(1, "Slug cannot be empty")
    .regex(slugRegex, "Slug must be lowercase alphanumeric and hyphens only").optional(),
  excerpt: z.string().optional().nullable(),
  excerptEn: z.string().optional().nullable(),
  excerptBn: z.string().optional().nullable(),
  content: z.union([z.string(), z.record(z.any()), z.array(z.any())]).optional(),
  contentEn: z.union([z.string(), z.record(z.any()), z.array(z.any())]).optional(),
  contentBn: z.union([z.string(), z.record(z.any()), z.array(z.any())]).optional(),
  cover_image_url: z.string().optional().nullable(),
  tags: z.preprocess((val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      return val.trim() === "" ? [] : val.split(",").map(s => s.trim());
    }
    return undefined;
  }, z.array(z.string()).optional()).optional(),
  seo_title: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seoTitleEn: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seoTitleBn: z.string().max(70, "SEO Title cannot exceed 70 characters").optional().nullable(),
  seo_description: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  seoDescriptionEn: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  seoDescriptionBn: z.string().max(170, "SEO Description cannot exceed 170 characters").optional().nullable(),
  status: z.enum(["draft", "published", "archived"]).optional()
});
