import * as svc from "./branch.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getAllBranches = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Branches", await svc.getAll())));
export const getBranchById = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Branch", await svc.getById(req.params.id))));
export const createBranch = catchAsync(async (req, res) => res.status(201).json(new ApiResponse(201, "Created", await svc.create(req.body))));
export const updateBranch = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Updated", await svc.update(req.params.id, req.body))));
export const toggleBranchStatus = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Toggled", await svc.toggle(req.params.id))));
export const deleteBranch = catchAsync(async (req, res) => { await svc.remove(req.params.id); res.json(new ApiResponse(200, "Deleted")); });
