import * as svc from "./finance.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";
import { generateReceiptPDF } from "../certificates/certificate.service.js";
import AppError from "../../core/errors/AppError.js";

export const getCampusFees = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Fees", await svc.fetchCampusFees(req.query, req.branchFilter))));

export const getStudentFinance = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Finance", await svc.fetchStudentFinance(req.params.studentId, req.branchFilter))));

export const collectPayment = catchAsync(async (req, res) =>
  res.status(201).json(new ApiResponse(201, "Paid", await svc.processPayment(req.body, req.user.id, req.branchFilter))));

export const updateFeeDiscount = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "Discount updated", await svc.modifyFeeDiscount(req.params.feeId, Number(req.body.discount), req.user.id, req.branchFilter))));

export const downloadPaymentReceipt = catchAsync(async (req, res) => {
  const payment = await svc.fetchPaymentById(req.params.id);
  if (!payment) throw new AppError("Payment record not found", 404);
  const pdfBuffer = await generateReceiptPDF(payment);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="Receipt_${payment.receipt_number}.pdf"`);
  res.send(pdfBuffer);
});

export const sendSMSReminder = catchAsync(async (req, res) =>
  res.json(new ApiResponse(200, "SMS sent")));
