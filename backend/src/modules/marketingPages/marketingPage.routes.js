import { Router } from "express";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { PERMISSIONS } from "../../constants/permissions.js";
import * as ctrl from "./marketingPage.controller.js";

// Admin Router
const adminRouter = Router();
adminRouter.use(verifyToken);
adminRouter.get("/:slug", requirePermission(PERMISSIONS.MANAGE_SETTINGS), ctrl.getPage);
adminRouter.put("/:slug", requirePermission(PERMISSIONS.MANAGE_SETTINGS), ctrl.savePage);

// Public Router
const publicRouter = Router();
publicRouter.get("/mentors/list", ctrl.getPublicMentors);
publicRouter.get("/:slug", ctrl.getPage);

export { adminRouter, publicRouter };
