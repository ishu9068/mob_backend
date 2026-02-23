// 404 Not Found Middleware
export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not Found - ${req.originalUrl}`));
};

// Global Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message || "Server Error ",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
