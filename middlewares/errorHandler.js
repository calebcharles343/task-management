const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  // const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // Not working
  // console.log(value);
  const value = err.keyValue.name; // Fix by charles

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message, // Ensure message is included here
    });
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};
//////////////////////////////
/* global error handler */
////////////////////////////////
module.exports = (err, req, res, next) => {
  // Set default error properties if not set
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV.trim() === "development") {
    // Development mode: Provide full error details
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV.trim() === "production") {
    // Production mode: Create a deep copy to ensure all error properties are retained
    let error = Object.assign({}, err);
    error.message = err.message; // Ensure `message` field is copied explicitly

    // Handle known error types
    if (error.name === "CastError" || err.kind === "ObjectId")
      error = handleCastErrorDB(error); // Handle invalid MongoDB IDs
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // Handle duplicate fields
    if (
      error.name === "ValidationError" ||
      error._message === "Validation failed"
    )
      error = handleValidationErrorDB(error); // Handle validation errors
    if (error.name === "JsonWebTokenError") error = handleJWTError(); // Handle JWT error
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError(); // Handle expired JWT

    // Send the error response in production mode
    sendErrorProd(error, res);
  }

  // Ensure request/response cycle ends
  next();
};
