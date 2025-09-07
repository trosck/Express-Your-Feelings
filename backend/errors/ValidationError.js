/**
 * @fileoverview Custom validation error class for task validation failures
 * @author Task Manager Team
 * @version 1.0.0
 */

/**
 * Custom error class for validation failures
 * Extends the built-in Error class to provide specific validation error handling
 * @extends Error
 */
class ValidationError extends Error {
  /**
   * Create a new ValidationError instance
   * @param {string} message - The validation error message
   */
  constructor(message) {
    super(message);
    /** @type {string} The name of the error type */
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;