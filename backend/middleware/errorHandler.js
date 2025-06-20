const logger = require('../utils/logger');

/**
 * Error handler middleware
 */
const errorHandler = {
  /**
   * Handle 404 errors
   */
  notFound: (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
  },

  /**
   * Global error handler
   */
  globalError: (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log error
    logger.error(`Error ${status}: ${message}`, {
      url: req.originalUrl,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      stack: err.stack
    });

    // Don't leak stack traces in production
    const errorResponse = {
      error: status === 500 ? 'Internal Server Error' : message,
      message: status === 500 ? 'Something went wrong' : message,
      status,
      timestamp: new Date().toISOString()
    };

    // Add validation details if available
    if (err.details) {
      errorResponse.details = err.details;
    }

    res.status(status).json(errorResponse);
  },

  /**
   * Async error wrapper
   */
  asyncHandler: (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
};

module.exports = errorHandler; 