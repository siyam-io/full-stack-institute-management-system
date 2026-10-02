import { Router } from "express";
import * as ctrl from "./attendance.controller.js";
import { verifyToken } from "../../middlewares/auth.js";

const router = Router();

// Protect all attendance routes
router.use(verifyToken);

// QR Attendance Scanner endpoint
router.post("/scan-qr", ctrl.scanQRAttendance);

// Save / bulk-mark attendance
router.post("/save", ctrl.saveBatchAttendance);

// Get attendance for a batch on a date
router.get("/batch/:batchId", ctrl.getBatchAttendance);

// Student attendance history
router.get("/student/:studentId", ctrl.getStudentAttendance);

export default router;
