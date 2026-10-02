import * as svc from "./cms.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

// ─── Section Controllers (Admin) ───

export const getSections = catchAsync(async (req, res) => {
  const sections = await svc.getAllSections();
  res.json(new ApiResponse(200, "CMS sections", sections));
});

export const getSectionByKey = catchAsync(async (req, res) => {
  const translation = await svc.getSectionTranslation(req.params.sectionKey, null);
  res.json(new ApiResponse(200, "Section translation", translation));
});

export const upsertSection = catchAsync(async (req, res) => {
  const translation = await svc.upsertSectionTranslation(req.params.sectionKey, null, req.body);
  res.json(new ApiResponse(200, "Section updated", translation));
});

// ─── Section Controllers (Public) ───

export const getPublicSection = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const translation = await svc.getSectionTranslationPublic(req.params.sectionKey, locale);
  res.json(new ApiResponse(200, "Public section", translation));
});

// ─── Testimonial Controllers (Admin) ───

export const getTestimonials = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const testimonials = await svc.getAllTestimonials(locale);
  res.json(new ApiResponse(200, "Testimonials", testimonials));
});

export const createTestimonial = catchAsync(async (req, res) => {
  const testimonial = await svc.createTestimonial(req.body);
  res.status(201).json(new ApiResponse(201, "Testimonial created", testimonial));
});

export const updateTestimonial = catchAsync(async (req, res) => {
  const testimonial = await svc.updateTestimonial(req.params.id, req.body);
  res.json(new ApiResponse(200, "Testimonial updated", testimonial));
});

export const deleteTestimonial = catchAsync(async (req, res) => {
  await svc.deleteTestimonial(req.params.id);
  res.json(new ApiResponse(200, "Testimonial deleted"));
});

// ─── Testimonial Controllers (Public) ───

export const getPublicTestimonials = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const testimonials = await svc.getPublicTestimonials(locale);
  res.json(new ApiResponse(200, "Public testimonials", testimonials));
});

// ─── Team Member Controllers (Admin) ───

export const getTeamMembers = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const members = await svc.getAllTeamMembers(locale);
  res.json(new ApiResponse(200, "Team members", members));
});

export const createTeamMember = catchAsync(async (req, res) => {
  const member = await svc.createTeamMember(req.body);
  res.status(201).json(new ApiResponse(201, "Team member created", member));
});

export const updateTeamMember = catchAsync(async (req, res) => {
  const member = await svc.updateTeamMember(req.params.id, req.body);
  res.json(new ApiResponse(200, "Team member updated", member));
});

export const deleteTeamMember = catchAsync(async (req, res) => {
  await svc.deleteTeamMember(req.params.id);
  res.json(new ApiResponse(200, "Team member deleted"));
});

// ─── Team Member Controllers (Public) ───

export const getPublicTeamMembers = catchAsync(async (req, res) => {
  const locale = req.query.lang || req.query.locale || "en";
  const members = await svc.getPublicTeamMembers(locale);
  res.json(new ApiResponse(200, "Public team members", members));
});

export const uploadFile = catchAsync(async (req, res) => {
  if (!req.file) {
    return res.status(400).json(new ApiResponse(400, "No file uploaded"));
  }

  let fileUrl = `/uploads/cms/${req.file.filename}`;

  try {
    const { isCloudinaryConfigured, uploadToCloudinary } = await import("../../core/storage/cloudinary.js");
    if (isCloudinaryConfigured()) {
      const result = await uploadToCloudinary(req.file.path, { folder: "culinary_academy/cms" });
      fileUrl = result.secure_url;
      try {
        const fs = await import("fs");
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      } catch (e) {}
    }
  } catch (err) {
    console.warn("⚠️ Cloudinary upload skipped/failed:", err.message);
  }

  res.json(new ApiResponse(200, "File uploaded successfully", { url: fileUrl }));
});
