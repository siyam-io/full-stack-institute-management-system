import { Router } from "express";
import * as ctrl from "./cms.controller.js";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { upload } from "../../middlewares/multer.js";
import {
  sectionUpsertSchema,
  testimonialCreateSchema,
  testimonialUpdateSchema,
  teamMemberCreateSchema,
  teamMemberUpdateSchema,
} from "./cms.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";

// ─── Admin Routes ───
const adminRouter = Router();
adminRouter.use(verifyToken);

// Sections
adminRouter.get("/sections", requirePermission(PERMISSIONS.CMS_VIEW), ctrl.getSections);
adminRouter.get("/sections/:sectionKey", requirePermission(PERMISSIONS.CMS_VIEW), ctrl.getSectionByKey);
adminRouter.put("/sections/:sectionKey", requirePermission(PERMISSIONS.CMS_EDIT), validate(sectionUpsertSchema), ctrl.upsertSection);
adminRouter.post("/upload", requirePermission(PERMISSIONS.CMS_EDIT), upload.single("file"), ctrl.uploadFile);

// Testimonials
adminRouter.get("/testimonials", requirePermission(PERMISSIONS.TESTIMONIAL_VIEW), ctrl.getTestimonials);
adminRouter.post("/testimonials", requirePermission(PERMISSIONS.TESTIMONIAL_EDIT), validate(testimonialCreateSchema), ctrl.createTestimonial);
adminRouter.put("/testimonials/:id", requirePermission(PERMISSIONS.TESTIMONIAL_EDIT), validate(testimonialUpdateSchema), ctrl.updateTestimonial);
adminRouter.delete("/testimonials/:id", requirePermission(PERMISSIONS.TESTIMONIAL_EDIT), ctrl.deleteTestimonial);

// Team members
adminRouter.get("/strategic-team", requirePermission(PERMISSIONS.TEAM_VIEW), ctrl.getTeamMembers);
adminRouter.post("/strategic-team", requirePermission(PERMISSIONS.TEAM_EDIT), validate(teamMemberCreateSchema), ctrl.createTeamMember);
adminRouter.put("/strategic-team/:id", requirePermission(PERMISSIONS.TEAM_EDIT), validate(teamMemberUpdateSchema), ctrl.updateTeamMember);
adminRouter.delete("/strategic-team/:id", requirePermission(PERMISSIONS.TEAM_EDIT), ctrl.deleteTeamMember);

// ─── Public Routes ───
const publicRouter = Router();

// Public sections
publicRouter.get("/cms/:sectionKey", ctrl.getPublicSection);

// Public testimonials
publicRouter.get("/testimonials", ctrl.getPublicTestimonials);

// Public team members
publicRouter.get("/strategic-team", ctrl.getPublicTeamMembers);

export { adminRouter, publicRouter };
