import { Router } from "express";
import { verifyToken, requirePermission, injectBranchFilter } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { upload } from "../../../middlewares/multer.js";
import { userCreateSchema, updateUserSchema, roleUpdateSchema } from "../../../validators/user.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";
import * as ctrl from "./user.controller.js";

const router = Router();
router.use(verifyToken);

router.get("/all", requirePermission(PERMISSIONS.VIEW_EMPLOYEES), injectBranchFilter, ctrl.getAllUsers);
router.get("/", requirePermission(PERMISSIONS.VIEW_EMPLOYEES), injectBranchFilter, ctrl.getAllUsers);
router.get("/search", requirePermission(PERMISSIONS.VIEW_EMPLOYEES), injectBranchFilter, ctrl.searchUser);
router.get("/profile/me", ctrl.getMyProfile);
router.get("/:id", ctrl.getUserById);
router.post("/create", requirePermission(PERMISSIONS.EMPLOYEE_EDIT), upload.single("photo"), validate(userCreateSchema), ctrl.addUser);
router.put("/:id", requirePermission(PERMISSIONS.EMPLOYEE_EDIT), upload.single("photo"), validate(updateUserSchema), ctrl.updateUser);
router.put("/profile/update", requirePermission(PERMISSIONS.UPDATE_MY_PROFILE), upload.single("photo"), validate(updateUserSchema), ctrl.updateMyProfile);
router.patch("/update-status/:id", requirePermission(PERMISSIONS.EMPLOYEE_ACTIVE_STATUS), ctrl.updateUserStatus);
router.patch("/:id/role", requirePermission(PERMISSIONS.EMPLOYEE_ROLE_CONTROL), validate(roleUpdateSchema), ctrl.updateUserRole);
router.delete("/:id/image", requirePermission(PERMISSIONS.EMPLOYEE_EDIT), ctrl.removeUserImage);
router.delete("/:id", requirePermission(PERMISSIONS.EMPLOYEE_DELETE), ctrl.deleteUser);
export default router;
