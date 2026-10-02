import { Router } from "express";
import * as ctrl from "./role.controller.js";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { createRoleSchema, updateRoleSchema } from "../../../validators/role.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router();
router.use(verifyToken);
router.get("/", requirePermission(PERMISSIONS.MANAGE_ROLES), ctrl.getRoles);
router.get("/:id", requirePermission(PERMISSIONS.MANAGE_ROLES), ctrl.getRoleById);
router.post("/", requirePermission(PERMISSIONS.MANAGE_ROLES), validate(createRoleSchema), ctrl.createRole);
router.put("/:id", requirePermission(PERMISSIONS.MANAGE_ROLES), validate(updateRoleSchema), ctrl.updateRole);
router.delete("/:id", requirePermission(PERMISSIONS.MANAGE_ROLES), ctrl.deleteRole);
export default router;
