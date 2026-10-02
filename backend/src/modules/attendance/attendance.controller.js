import * as svc from "./attendance.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getBatchAttendance = catchAsync(async (req, res) => {
  const { batchId } = req.params;
  const { date } = req.query;
  const data = await svc.getBatchAttendance(batchId, date);
  res.json(new ApiResponse(200, "Batch attendance loaded", data));
});

export const saveBatchAttendance = catchAsync(async (req, res) => {
  const { batchId, date, records, classContentId } = req.body;
  const data = await svc.saveBatchAttendance({
    batchId,
    dateStr: date,
    records,
    recordedBy: req.user?.id,
    classContentId,
  });
  res.json(new ApiResponse(200, "Attendance saved successfully", data));
});

export const scanQRAttendance = catchAsync(async (req, res) => {
  const { qrData, batchId } = req.body;
  const data = await svc.scanQRAndMarkAttendance({
    qrData,
    batchId,
    recordedBy: req.user?.id,
  });
  res.json(new ApiResponse(200, data.message, data));
});

export const getStudentAttendance = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const data = await svc.getStudentAttendance(studentId);
  res.json(new ApiResponse(200, "Student attendance history", data));
});
