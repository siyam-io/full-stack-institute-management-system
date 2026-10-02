import { Router } from "express";
import { getBranchStats, getDashboardStats } from "./dashboard.controller.js";
import { verifyToken, requirePermission, injectBranchFilter } from "../../middlewares/auth.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router();
router.use(verifyToken);
router.get("/stats", requirePermission(PERMISSIONS.VIEW_ADMIN_DASHBOARD), injectBranchFilter, getDashboardStats);
router.get("/branch-stats/:branchId", requirePermission(PERMISSIONS.VIEW_BRANCH_DASHBOARD), injectBranchFilter, getBranchStats);
export default router;
