const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(res.statusCode).json({
    success: false,
    error: err,
    message: err.message,
    errorDetails: err.stack,
  });
};
