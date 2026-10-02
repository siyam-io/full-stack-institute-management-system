import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import prisma from "../core/db/prisma.js";
import AppError from "../core/errors/AppError.js";
import catchAsync from "../core/http/asyncHandler.js";

const checkIsMaster = (role) => {
  if (!role) return false;
  const safeName = role.name?.toLowerCase().replace(/\s/g, "");
  let permissions = role.permissions || [];
  if (typeof permissions === "string") {
    try {
      permissions = JSON.parse(permissions);
    } catch {
      permissions = [];
    }
  }
  return (
    safeName === "superadmin" ||
    safeName === "admin" ||
    (Array.isArray(permissions) && permissions.includes("all_access"))
  );
};

export const verifyToken = catchAsync(async (req, res, next) => {
  let token = req.cookies?.jwt;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError("Unauthorized - No Token Provided", 401));

  const decoded = jwt.verify(token, ENV.JWT_SECRET);
  const userRow = await prisma.$queryRaw`
    SELECT u.*,
      json_build_object('id', r.id, 'name', r.name, 'description', r.description,
                        'permissions', r.permissions, 'is_system_role', r.is_system_role,
                        'createdAt', r.created_at, 'updatedAt', r.updated_at) AS role
    FROM "users" u
    JOIN "roles" r ON r.id = u.role_id
    WHERE u.id = CAST(${decoded.userId} AS uuid)
    LIMIT 1
  `;
  const user = userRow[0] || null;

  if (!user) return next(new AppError("Account not found", 404));
  if (user.status !== "Active") return next(new AppError("Your account is deactivated", 403));

  req.user = user;
  
  if (user && typeof user.role === "string") {
    try {
      user.role = JSON.parse(user.role);
    } catch {}
  }

  let permissions = user.role?.permissions || [];
  if (typeof permissions === "string") {
    try {
      permissions = JSON.parse(permissions);
    } catch {
      permissions = [];
    }
  }
  req.user.permissions = permissions;
  req.isMaster = checkIsMaster(user.role);

  next();
});

export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.isMaster) {
      return next();
    }

    const userPermissions = req.user.permissions || req.user.role?.permissions || [];
    if (!userPermissions.includes(permission)) {
      return next(new AppError("Access Denied: Insufficient permissions", 403));
    }
    next();
  };
};

export const injectBranchFilter = (req, res, next) => {
  req.branchFilter = { branch: req.user.branch_id || req.user.branchId };

  if (req.isMaster) {
    const requestedBranch = req.query.branch || req.body.branch;

    if (requestedBranch && requestedBranch !== "all") {
      req.branchFilter = { branch: requestedBranch };
    } else {
      req.branchFilter = {};
    }
  } else {
    const requestedBranch = req.params.branchId || req.query.branch || req.body.branch;

    if (
      requestedBranch &&
      requestedBranch !== "all" &&
      requestedBranch.toString() !== (req.user.branch_id || req.user.branchId)?.toString()
    ) {
      return next(
        new AppError("Branch Access Denied! You can only access your own campus data.", 403),
      );
    }
  }

  next();
};
