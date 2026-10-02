import { Router } from "express";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { upload } from "../../../middlewares/multer.js";
import { blogCreateSchema, blogUpdateSchema } from "../../../validators/blog.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";
import * as ctrl from "./blog.controller.js";

// Admin Router
const adminRouter = Router();
adminRouter.use(verifyToken);

adminRouter.get("/", requirePermission(PERMISSIONS.BLOG_VIEW), ctrl.getBlogs);
adminRouter.get("/:id", requirePermission(PERMISSIONS.BLOG_VIEW), ctrl.getBlogById);
adminRouter.post("/", requirePermission(PERMISSIONS.BLOG_CREATE), upload.single("photo"), validate(blogCreateSchema), ctrl.createBlog);
adminRouter.put("/:id", requirePermission(PERMISSIONS.BLOG_EDIT), upload.single("photo"), validate(blogUpdateSchema), ctrl.updateBlog);
adminRouter.patch("/:id/status", requirePermission(PERMISSIONS.BLOG_PUBLISH), ctrl.updateBlogStatus);
adminRouter.delete("/:id", requirePermission(PERMISSIONS.BLOG_DELETE), ctrl.deleteBlog);

// Public Router
const publicRouter = Router();
publicRouter.get("/", ctrl.getPublicBlogs);
publicRouter.get("/:slug", ctrl.getPublicBlogBySlug);

export { adminRouter, publicRouter };
