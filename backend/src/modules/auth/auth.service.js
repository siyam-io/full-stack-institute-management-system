import crypto from "crypto";
import { hashPassword, comparePassword } from "../../core/security/password.js";
import { generateToken } from "../../core/security/jwt.js";
import AppError from "../../core/errors/AppError.js";
import * as repo from "./auth.repository.js";
import { serializeUser } from "../../core/utils/serialize.js";
import { formatUserResponse } from "./auth.serializer.js";
import { sendEmail } from "../../../utils/email.js";

export { formatUserResponse };

export const authenticateUser = async (email, password) => {
  const user = await repo.findUserByEmail(email);
  if (!user) throw new AppError("Invalid credentials", 400);
  if (user.status !== "Active") throw new AppError("Account restricted.", 403);

  const ok = await comparePassword(password, user.password);
  if (!ok) throw new AppError("Invalid credentials", 400);

  return serializeUser(user);
};

export const fetchAuthenticatedUser = async (userId) => {
  const user = await repo.findUserById(userId);
  if (!user) throw new AppError("User not found", 404);
  return serializeUser(user);
};

export const registerNewUser = async (userData) => {
  const { username, email, password, full_name, employee_id, phone, designation, department, branchId, roleId, branch_id, role_id } = userData;

  const dup = await repo.checkDuplicateUser(email, username, employee_id);
  if (dup) {
    if (dup.email === email) throw new AppError("Email already exists", 400);
    if (dup.username === username) throw new AppError("Username already exists", 400);
    if (dup.employee_id === employee_id) throw new AppError("Employee ID already exists", 400);
  }

  let finalRoleId = roleId || role_id;
  if (!finalRoleId) {
    const dbRole = await repo.findRoleByName("instructor");
    if (dbRole) finalRoleId = dbRole.id;
  }

  const hashedPassword = await hashPassword(password);

  const user = await repo.createUser({
    email,
    username,
    password: hashedPassword,
    full_name,
    employee_id,
    phone,
    designation: designation || "Staff",
    department: department || "General",
    status: "Active",
    branch_id: branchId || branch_id,
    role_id: finalRoleId,
  });

  return serializeUser(user);
};

export const generatePasswordResetToken = async (email) => {
  const user = await repo.findUserByEmail(email);
  if (!user) throw new AppError("There is no user with that email address.", 404);

  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  await repo.updateUser(user.id, {
    reset_password_token: hashedToken,
    reset_password_expire: new Date(Date.now() + 60 * 60 * 1000),
  });

  const frontendUrl = process.env.NODE_ENV === "development" ? "http://localhost:5174" : process.env.CLIENT_URL || "http://localhost:5174";
  const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;

  try {
    await sendEmail({ to: user.email, subject: "Password Reset", html: `<a href="${resetUrl}">Reset</a>` });
  } catch (e) {
    if (process.env.NODE_ENV === "development") console.log("🔑 Reset URL:", resetUrl);
  }
};

export const resetUserPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await repo.findUserByResetToken(hashedToken);
  if (!user) throw new AppError("Token is invalid or has expired.", 400);

  const hashedPassword = await hashPassword(newPassword);
  await repo.updateUser(user.id, { password: hashedPassword, reset_password_token: null, reset_password_expire: null });
  return user;
};
