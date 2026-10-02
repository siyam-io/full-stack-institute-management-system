import * as svc from "./student.service.js";
import * as commentSvc from "./comments/comment.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const getAllStudents = catchAsync(async (req, res) => {
  const r = await svc.fetchAllStudents(req.query, req.branchFilter);
  res.json(ApiResponse.paginated("Students", r.students, r.pagination));
});

export const searchStudent = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Results", await svc.performStudentSearch(req.query.query, req.branchFilter))));

export const getAdminStudentById = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Student", await svc.fetchAdminStudentById(req.params.id, req.branchFilter))));

export const addStudent = catchAsync(async (req, res) =>
  res.status(201).json(new ApiResponse(201, "Created", await svc.createStudent(req.body, req.file, req.isMaster, req.user.branch, req.user.id))));

export const updateStudent = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Updated", await svc.modifyStudent(req.params.id, req.body, req.file, req.branchFilter, req.isMaster, req.user.branch))));

export const toggleStudentStatus = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Toggled", await svc.switchStudentStatus(req.params.id, req.branchFilter))));

export const removeStudentImage = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Image removed", await svc.deleteStudentImage(req.params.id, req.branchFilter))));

export const deleteStudent = catchAsync(async (req, res) => {
  await svc.removeStudent(req.params.id, req.branchFilter);
  res.json(new ApiResponse(200, "Deleted"));
});

export const publicSearchStudent = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Student", await svc.fetchPublicStudentSearch(req.query.query))));

export const getPublicStudentById = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Student", await svc.fetchPublicStudentById(req.params.id))));

