import * as svc from "./dashboard.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getDashboardStats = catchAsync(async (req, res) => {
  const stats = await svc.fetchDashboardStats(req.branchFilter);
  res.json(new ApiResponse(200, "Dashboard stats", stats));
});

export const getBranchStats = catchAsync(async (req, res) => {
  const stats = await svc.fetchBranchStats(req.params.branchId);
  res.json(new ApiResponse(200, "Branch stats", stats));
});
