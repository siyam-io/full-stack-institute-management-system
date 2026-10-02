import * as svc from "./class.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getBatchClasses = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Classes", await svc.fetchBatchClasses(req.params.batchId, req.branchFilter))));

export const addClassToSyllabus = catchAsync(async (req, res) =>
  res.status(201).json(new ApiResponse(201, "Added", await svc.insertClassesToSyllabus(req.params.batchId, req.body, req.branchFilter))));

export const autoScheduleSyllabus = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Scheduled", await svc.generateAutoSchedule(req.params.batchId, req.branchFilter))));

export const scheduleClass = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Scheduled", await svc.assignClassDate(req.params.classId, req.body.date_scheduled, req.branchFilter))));


export const updateClassContent = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Updated", await svc.modifyClassContent(req.params.classId, req.body, req.branchFilter))));

export const deleteClassContent = catchAsync(async (req, res) => {
  await svc.removeClassContent(req.params.classId, req.branchFilter);
  res.json(new ApiResponse(200, "Deleted"));
});
