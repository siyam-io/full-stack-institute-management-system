import * as repo from "./certificate.service.js";
import { serializeStudent, serializeUser } from "../../core/utils/serialize.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const downloadCertificatePDF = catchAsync(async (req, res) => {
  const pdfBuffer = await repo.generateCertificatePDF(req.params.id, req.body.awardedOn);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="Certificate_${req.params.id}.pdf"`);
  res.send(pdfBuffer);
});

export const sendCertificateEmail = catchAsync(async (req, res) => {
  await repo.sendCertificateEmail(req.params.id);
  res.json(new ApiResponse(200, "Certificate email sent"));
});

export const downloadEmployeeID = catchAsync(async (req, res) => {
  const pdfBuffer = await repo.generateEmployeeIdPDF(req.params.id);
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="ID_Card_${req.params.id}.pdf"`);
  res.send(pdfBuffer);
});
