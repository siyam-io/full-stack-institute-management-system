import * as service from "./marketingPage.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getPage = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const isAdmin = req.originalUrl.startsWith("/api/marketing-pages");
  const locale = isAdmin ? null : (req.query.locale || "en");
  const page = await service.getPage(slug, locale);
  if (!page) {
    return res.status(200).json(new ApiResponse(200, "Page content not found in database", null));
  }
  res.json(new ApiResponse(200, "Page content fetched successfully", page));
});

export const savePage = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const isAdmin = req.originalUrl.startsWith("/api/marketing-pages");
  const locale = isAdmin ? null : (req.body.locale || "en");
  const content = req.body.content;
  const page = await service.savePage(slug, locale, {
    title: req.body.title,
    title_en: req.body.title_en || req.body.titleEn,
    title_bn: req.body.title_bn || req.body.titleBn,
    content_en: req.body.content_en || req.body.contentEn,
    content_bn: req.body.content_bn || req.body.contentBn,
    content: typeof content === "string" ? JSON.parse(content) : content,
    seo_title: req.body.seo_title,
    seo_title_en: req.body.seo_title_en || req.body.seoTitleEn,
    seo_title_bn: req.body.seo_title_bn || req.body.seoTitleBn,
    seo_description: req.body.seo_description,
    seo_description_en: req.body.seo_description_en || req.body.seoDescriptionEn,
    seo_description_bn: req.body.seo_description_bn || req.body.seoDescriptionBn,
  });
  res.json(new ApiResponse(200, "Page saved successfully", page));
});

export const getPublicMentors = catchAsync(async (req, res) => {
  const mentors = await service.getActiveMentors();
  res.json(new ApiResponse(200, "Active mentors fetched successfully", mentors));
});
