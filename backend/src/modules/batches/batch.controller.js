import * as svc from "./batch.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getAllBatches = catchAsync(async (req, res) => { const r = await svc.fetchAll(req.query, req.branchFilter, req.isMaster); res.json(ApiResponse.paginated("Batches", r.data, r.pagination)); });
export const getBatchById = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Batch", await svc.fetchById(req.params.id, req.branchFilter))));
export const createBatch = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Created", await svc.createBatch(req.body))));
export const updateBatch = catchAsync(async (req, res) => res.json(new ApiResponse(200, "Updated", await svc.modify(req.params.id, req.body, req.branchFilter))));
export const deleteBatch = catchAsync(async (req, res) => { await svc.remove(req.params.id); res.json(new ApiResponse(200, "Deleted")); });
