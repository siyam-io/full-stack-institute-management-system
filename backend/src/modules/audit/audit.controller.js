import * as auditService from "./audit.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getAuditLogs = catchAsync(async (req, res) => {
  const page = parseInt(req.query.page || "1", 10);
  const limit = parseInt(req.query.limit || "20", 10);
  const search = req.query.search || "";
  const method = req.query.method || "";

  const result = await auditService.fetchAuditLogs(page, limit, search, method);
  
  res.status(200).json(new ApiResponse(200, "Audit logs fetched successfully", result));
});
