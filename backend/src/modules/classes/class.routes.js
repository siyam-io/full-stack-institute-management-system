import { Router } from "express";
import * as ctrl from "./class.controller.js";
import { verifyToken, requirePermission, injectBranchFilter } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { addClassSchema, updateClassContentSchema, scheduleClassSchema } from "../../../validators/class.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router();
router.use(verifyToken);
router.use(injectBranchFilter);
router.get("/batch/:batchId", requirePermission(PERMISSIONS.VIEW_BATCH_WORKSPACE), ctrl.getBatchClasses);
router.post("/batch/:batchId", requirePermission(PERMISSIONS.CURRICULUM_MATRIX), validate(addClassSchema), ctrl.addClassToSyllabus);
router.post("/batch/:batchId/auto-schedule", requirePermission(PERMISSIONS.VIEW_BATCH_CALENDAR), ctrl.autoScheduleSyllabus);
router.put("/:classId/schedule", requirePermission(PERMISSIONS.VIEW_BATCH_CALENDAR), validate(scheduleClassSchema), ctrl.scheduleClass);
router.put("/:classId", requirePermission(PERMISSIONS.CURRICULUM_MATRIX), validate(updateClassContentSchema), ctrl.updateClassContent);
router.delete("/:classId", requirePermission(PERMISSIONS.CURRICULUM_MATRIX), ctrl.deleteClassContent);
export default router;
