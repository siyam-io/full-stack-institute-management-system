import * as service from "./auth.service.js";
import { ENV } from "../../config/env.js";
import { generateToken } from "../../core/security/jwt.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const register = catchAsync(async (req, res) => {
  const user = await service.registerNewUser(req.body);
  res.status(201).json(new ApiResponse(201, "User registered successfully", user));
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await service.authenticateUser(email, password);
  const token = generateToken(user._id || user.id);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge: ENV.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
  });

  res.status(200).json(new ApiResponse(200, "Login successful", service.formatUserResponse(user)));
});

export const checkAuth = catchAsync(async (req, res) => {
  const user = await service.fetchAuthenticatedUser(req.user.id);
  res.status(200).json(new ApiResponse(200, "Authenticated", user));
});

export const logout = catchAsync(async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json(new ApiResponse(200, "Logged out successfully"));
});

export const forgotPassword = catchAsync(async (req, res) => {
  await service.generatePasswordResetToken(req.body.email);
  res.status(200).json(new ApiResponse(200, "If the email exists, a reset link has been sent"));
});

export const resetPassword = catchAsync(async (req, res) => {
  await service.resetUserPassword(req.params.token, req.body.password);
  res.status(200).json(new ApiResponse(200, "Password reset successful"));
});
