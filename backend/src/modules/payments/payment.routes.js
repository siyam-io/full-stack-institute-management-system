import { Router } from "express";
import * as ctrl from "./payment.controller.js";
import { verifyToken } from "../../middlewares/auth.js";

const router = Router();

// Protect payments router with JWT
router.use(verifyToken);

// bKash Checkout
router.post("/bkash/create", ctrl.initBkashPayment);
router.post("/bkash/execute", ctrl.executeBkashPayment);

// Manual Digital Payment Verification
router.post("/manual-verify", ctrl.manualVerifyPayment);

export default router;
