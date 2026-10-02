import { Router } from "express";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { downloadCertificatePDF, sendCertificateEmail, downloadEmployeeID } from "./certificate.controller.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = Router();
router.use(verifyToken);
router.post("/download/:id", requirePermission(PERMISSIONS.STUDENT_CERTIFICATE), downloadCertificatePDF);
router.post("/send/:id", requirePermission(PERMISSIONS.STUDENT_CERTIFICATE), sendCertificateEmail);
router.get("/employeeid/download/:id", requirePermission(PERMISSIONS.EMPLOYEE_IDCARD), downloadEmployeeID);
export default router;
