/**
 * @fileoverview Simple logging utility with different log levels and request logging middleware
 * Provides structured logging with timestamps and metadata support
 * @author Task Manager Team
 * @version 1.0.0
 */

/**
 * Logger utility object with different logging levels and middleware
 * Provides consistent logging format with timestamps and optional metadata
 * @namespace logger
 */
const logger = {
  /**
   * Log informational message
   * @param {string} message - The message to log
   * @param {Object|null} [meta=null] - Optional metadata object to include with the log
   */
  info: (message, meta = null) => {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] ${timestamp} - ${message}`, meta);
  },

  /**
   * Log warning message
   * @param {string} message - The warning message to log
   * @param {Object|null} [meta=null] - Optional metadata object to include with the log
   */
  warn: (message, meta = null) => {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] ${timestamp} - ${message}`, meta);
  },

  /**
   * Log error message
   * @param {string} message - The error message to log
   * @param {Object|null} [meta=null] - Optional metadata object to include with the log
   */
  error: (message, meta = null) => {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] ${timestamp} - ${message}`, meta);
  },

  /**
   * Log debug message (only in development environment)
   * Debug messages are suppressed in production for performance
   * @param {string} message - The debug message to log
   * @param {Object|null} [meta=null] - Optional metadata object to include with the log
   */
  debug: (message, meta = null) => {
    if (process.env.NODE_ENV !== 'production') {
      const timestamp = new Date().toISOString();
      console.log(`[DEBUG] ${timestamp} - ${message}`, meta);
    }
  },

  /**
   * Express middleware for logging HTTP requests
   * Logs request method, URL, status code, response time, and client information
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  requestLogger: (req, res, next) => {
    const start = Date.now();

    // Log when response finishes
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logLevel = res.statusCode >= 400 ? 'warn' : 'info';

      logger[logLevel](`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`, {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
    });

    next();
  }
};

module.exports = logger;