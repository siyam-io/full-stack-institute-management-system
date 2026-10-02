import * as svc from "./role.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getRoles = catchAsync(async (req, res) => { res.json(new ApiResponse(200, "Roles", await svc.getRoles())); });
export const getRoleById = catchAsync(async (req, res) => { res.json(new ApiResponse(200, "Role", await svc.getRoleById(req.params.id))); });
export const createRole = catchAsync(async (req, res) => { res.status(201).json(new ApiResponse(201, "Created", await svc.createRole(req.body))); });
export const updateRole = catchAsync(async (req, res) => { res.json(new ApiResponse(200, "Updated", await svc.updateRole(req.params.id, req.body))); });
export const deleteRole = catchAsync(async (req, res) => { await svc.deleteRole(req.params.id); res.json(new ApiResponse(200, "Deleted")); });
