import * as commentSvc from "./comment.service.js";
import catchAsync from "../../../core/http/asyncHandler.js";
import ApiResponse from "../../../core/http/ApiResponse.js";

export const addComment = catchAsync(async (req, res) =>
  res.status(201).json(new ApiResponse(201, "Comment added", await commentSvc.addComment(req.params.studentId, req.user.id, req.body.text))));

export const getStudentComments = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Comments", await commentSvc.getStudentComments(req.params.studentId))));

export const deleteComment = catchAsync(async (req, res) => {
  await commentSvc.deleteComment(req.params.commentId);
  res.json(new ApiResponse(200, "Deleted"));
});
