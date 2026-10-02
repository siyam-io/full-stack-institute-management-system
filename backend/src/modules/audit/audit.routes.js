import express from "express";
import * as controller from "./audit.controller.js";
import { verifyToken, requirePermission } from "../../middlewares/auth.js";
import { PERMISSIONS } from "../../constants/permissions.js";

const router = express.Router();

router.get("/", verifyToken, requirePermission(PERMISSIONS.MANAGE_ROLES), controller.getAuditLogs);

export default router;
