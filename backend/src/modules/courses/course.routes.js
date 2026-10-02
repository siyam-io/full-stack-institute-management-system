import { Router } from "express";
import * as ctrl from "./course.controller.js";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { upload } from "../../../middlewares/multer.js";
import { courseCreateSchema, courseUpdateSchema, publicPageUpsertSchema } from "../../../validators/course.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const adminRouter = Router();
adminRouter.use(verifyToken);

// Standard course CRUD
adminRouter.get("/", requirePermission(PERMISSIONS.VIEW_COURSES), ctrl.getAllCourses);
adminRouter.get("/all", requirePermission(PERMISSIONS.VIEW_COURSES), ctrl.getAllCourses);
adminRouter.get("/active", requirePermission(PERMISSIONS.VIEW_COURSES), ctrl.getActiveCourses);
adminRouter.get("/:id", requirePermission(PERMISSIONS.VIEW_COURSES), ctrl.getCourseById);
adminRouter.post("/", requirePermission(PERMISSIONS.COURSE_EDIT), validate(courseCreateSchema), ctrl.createCourse);
adminRouter.post("/create", requirePermission(PERMISSIONS.COURSE_EDIT), validate(courseCreateSchema), ctrl.createCourse);
adminRouter.put("/update/:id", requirePermission(PERMISSIONS.COURSE_EDIT), validate(courseUpdateSchema), ctrl.updateCourse);
adminRouter.patch("/toggle-status/:id", requirePermission(PERMISSIONS.COURSE_ACTIVE), ctrl.toggleCourseStatus);
adminRouter.delete("/delete/:id", requirePermission(PERMISSIONS.COURSE_DELETE), ctrl.deleteCourse);

// Course Public Page endpoints (nested under courses for admin convenience)
adminRouter.get("/:id/public-page", requirePermission(PERMISSIONS.VIEW_COURSES), ctrl.getCoursePublicPage);
adminRouter.post("/:id/public-page", requirePermission(PERMISSIONS.COURSE_EDIT), upload.single("cover_image"), validate(publicPageUpsertSchema), ctrl.updateCoursePublicPage);
adminRouter.patch("/:id/public-page/status", requirePermission(PERMISSIONS.COURSE_PUBLISH), ctrl.updateCoursePublicPageStatus);

// Public Router
const publicRouter = Router();
publicRouter.get("/", ctrl.getPublicCourses);
publicRouter.get("/:slug", ctrl.getPublicCourseBySlug);

export { adminRouter, publicRouter };
export default adminRouter;
