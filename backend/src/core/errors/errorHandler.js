import AppError from "../errors/AppError.js";
import { handlePrismaError } from "./prismaErrorMapper.js";

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg ? err.errmsg.match(/(["'])(\\?.)*?\1/)[0] : 'Duplicate field';
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError("Invalid token. Please log in again!", 401);
const handleJWTExpiredError = () => new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  } 
  else {
    console.error("ERROR ", err);
    res.status(500).json({
      success: false,
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  let error = err;
  
  // Auto-map Prisma & raw SQL errors (like unique constraint violation) to AppError
  try {
    handlePrismaError(err);
  } catch (mappedError) {
    error = mappedError;
  }

  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(error, res);
  } else {
    let errorCopy = Object.assign(error);
    errorCopy.message = error.message;

    if (errorCopy.name === "CastError") errorCopy = handleCastErrorDB(errorCopy);
    if (errorCopy.code === 11000) errorCopy = handleDuplicateFieldsDB(errorCopy);
    if (errorCopy.name === "ValidationError") errorCopy = handleValidationErrorDB(errorCopy);
    if (errorCopy.name === "JsonWebTokenError") errorCopy = handleJWTError();
    if (errorCopy.name === "TokenExpiredError") errorCopy = handleJWTExpiredError();

    sendErrorProd(errorCopy, res);
  }
};