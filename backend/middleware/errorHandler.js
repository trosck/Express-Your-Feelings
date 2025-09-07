/**
 * @fileoverview Express error handling middleware for 404 errors, global error handling, and async error wrapping
 * @author Task Manager Team
 * @version 1.0.0
 */

const logger = require('../utils/logger');

/**
 * Error handler middleware collection
 * Provides middleware functions for handling different types of errors in Express
 * @namespace errorHandler
 */
const errorHandler = {
  /**
   * Handle 404 Not Found errors
   * Creates a 404 error and passes it to the next middleware
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  notFound: (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    next(error);
  },

  /**
   * Global error handler middleware
   * Handles all errors passed through the Express error handling chain
   * Logs errors and sends appropriate error responses to clients
   * @param {Error} err - The error object
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  globalError: (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    // Log error with request context
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
   * Async error wrapper utility
   * Wraps async route handlers to automatically catch and forward errors
   * @param {Function} fn - Async function to wrap
   * @returns {Function} Express middleware function that handles async errors
   */
  asyncHandler: (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
};

module.exports = errorHandler;