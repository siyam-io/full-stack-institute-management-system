import * as svc from "./payment.service.js";
import catchAsync from "../../core/http/asyncHandler.js";
import ApiResponse from "../../core/http/ApiResponse.js";

export const initBkashPayment = catchAsync(async (req, res) => {
  const { invoiceId, amount, payerReference, callbackUrl } = req.body;
  const result = await svc.createBkashPayment({
    invoiceId,
    amount,
    payerReference,
    callbackUrl,
  });
  res.json(new ApiResponse(200, "bKash checkout session initialized", result));
});

export const executeBkashPayment = catchAsync(async (req, res) => {
  const { paymentID, invoiceId, amount, trxID } = req.body;
  const result = await svc.executeBkashPayment({
    paymentID,
    invoiceId,
    amount,
    trxID,
    userId: req.user?.id,
  });
  res.json(new ApiResponse(200, result.message, result));
});

export const manualVerifyPayment = catchAsync(async (req, res) => {
  const { invoiceId, amount, paymentMethod, transactionId, remarks } = req.body;
  const result = await svc.verifyManualDigitalPayment({
    invoiceId,
    amount,
    paymentMethod,
    transactionId,
    remarks,
    userId: req.user?.id,
  });
  res.json(new ApiResponse(200, result.message, result));
});
