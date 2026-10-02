import { Router } from "express";
import { login, register, checkAuth, logout, forgotPassword, resetPassword } from "./auth.controller.js";
import { verifyToken } from "../../middlewares/auth.js";
import { validate } from "../../middlewares/validate.js";
import { userCreateSchema, loginSchema } from "../../../validators/user.validator.js";

const router = Router();

router.post("/register", validate(userCreateSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", verifyToken, logout);
router.get("/check", verifyToken, checkAuth);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
