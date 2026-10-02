import { Router } from "express";
import * as ctrl from "./branch.controller.js";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { branchCreateSchema, branchUpdateSchema } from "../../../validators/branch.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router();
router.use(verifyToken);
router.get("/all", requirePermission(PERMISSIONS.VIEW_BRANCHES), ctrl.getAllBranches);
router.get("/", requirePermission(PERMISSIONS.VIEW_BRANCHES), ctrl.getAllBranches);
router.get("/:id", requirePermission(PERMISSIONS.VIEW_BRANCHES), ctrl.getBranchById);
router.post("/create", requirePermission(PERMISSIONS.BRANCH_EDIT), validate(branchCreateSchema), ctrl.createBranch);
router.put("/:id", requirePermission(PERMISSIONS.BRANCH_EDIT), validate(branchUpdateSchema), ctrl.updateBranch);
router.patch("/:id/toggle", requirePermission(PERMISSIONS.BRANCH_ACTIVE_STATUS), ctrl.toggleBranchStatus);
router.delete("/:id", requirePermission(PERMISSIONS.BRANCH_DELETE), ctrl.deleteBranch);
export default router;
