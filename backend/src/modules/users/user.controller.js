import * as svc from "./user.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getAllUsers = catchAsync(async (req, res) => { const r = await svc.fetchUsers({ ...req.branchFilter, ...req.query }, req.query.page, req.query.limit); res.json(ApiResponse.paginated("Users", r.users, r.pagination)); });
export const searchUser = catchAsync(async (req, res) => { const r = await svc.fetchUsers({ ...req.branchFilter, search: req.query.query }, 1, 20); res.json(new ApiResponse(200, "Search results", r.users)); });
export const getUserById = catchAsync(async (req, res) => res.json(new ApiResponse(200, "User", await svc.fetchById(req.params.id, req.branchFilter))));
export const addUser = catchAsync(async (req, res) => res.status(201).json(new ApiResponse(201, "Created", await svc.createUser(req.body, req.file, req.isMaster, req.user.branch))));
export const updateUser = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Updated", await svc.modifyUser(req.params.id, req.body, req.file, req.isMaster, req.user.branch, req.branchFilter))));
export const updateUserStatus = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Status updated", await svc.changeStatus(req.params.id, req.body.status, req.branchFilter))));
export const updateUserRole = catchAsync(async (req, res) => { const r = await svc.changeRole(req.params.id, req.body.role, req.isMaster); res.json(new ApiResponse(200, "Role updated", r)); });
export const removeUserImage = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Image removed", await svc.deleteImage(req.params.id, req.branchFilter))));
export const deleteUser = catchAsync(async (req, res) => { await svc.removeUser(req.params.id, req.branchFilter); res.json(new ApiResponse(200, "Deleted")); });
export const getMyProfile = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Profile", await svc.fetchById(req.user.id, {}))));
export const updateMyProfile = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Updated", await svc.modifyUser(req.user.id, req.body, req.file, true, req.user.branch, {}))));
