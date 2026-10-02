import { Router } from "express";
import { verifyToken, requirePermission, injectBranchFilter } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { collectPaymentSchema, updateDiscountSchema } from "../../../validators/finance.validator.js";
import { PERMISSIONS } from "../../constants/permissions.js";
import * as ctrl from "./finance.controller.js";

const router = Router();
router.use(verifyToken);
router.use(injectBranchFilter);
router.get("/fees", requirePermission(PERMISSIONS.STUDENT_PAYMENTS), ctrl.getCampusFees);
router.get("/student/:studentId", requirePermission(PERMISSIONS.STUDENT_PAYMENTS), ctrl.getStudentFinance);
router.get("/receipt/:id/download", requirePermission(PERMISSIONS.STUDENT_PAYMENTS), ctrl.downloadPaymentReceipt);
router.post("/pay", requirePermission(PERMISSIONS.STUDENT_PAYMENTS), validate(collectPaymentSchema), ctrl.collectPayment);
router.patch("/fee/:feeId/discount", requirePermission(PERMISSIONS.STUDENT_PAYMENTS), validate(updateDiscountSchema), ctrl.updateFeeDiscount);
router.post("/remind-sms", requirePermission(PERMISSIONS.STUDENT_PAYMENTS), ctrl.sendSMSReminder);
export default router;
