import { Router } from "express";
import * as ctrl from "./batch.controller.js";
import { verifyToken, requirePermission, injectBranchFilter } from "../../middlewares/auth.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router();
router.use(verifyToken);
router.use(injectBranchFilter);
router.get("/", requirePermission(PERMISSIONS.VIEW_ALL_BATCHES), ctrl.getAllBatches);
router.get("/:id", requirePermission(PERMISSIONS.VIEW_BATCH_WORKSPACE), ctrl.getBatchById);
router.post("/", requirePermission(PERMISSIONS.BATCH_EDIT), ctrl.createBatch);
router.put("/:id", requirePermission(PERMISSIONS.BATCH_EDIT), ctrl.updateBatch);
router.delete("/:id", requirePermission(PERMISSIONS.BATCH_DELETE), ctrl.deleteBatch);
export default router;
