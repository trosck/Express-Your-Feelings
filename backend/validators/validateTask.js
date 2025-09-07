/**
 * @fileoverview Task validation utility function
 * Provides validation logic for task data according to business rules
 * @author Task Manager Team
 * @version 1.0.0
 */

const taskEnum = require('../enums/task.enum');

/**
 * Validate task data according to business rules
 * @param {Object} taskData - Task data to validate
 * @param {string} [taskData.title] - Task title
 * @param {string} [taskData.description] - Task description
 * @param {string} [taskData.status] - Task status
 * @param {boolean} [isUpdate=false] - Whether this is an update operation (makes title optional)
 * @returns {string[]} Array of validation error messages (empty array if valid)
 */
export default function validateTask(taskData, isUpdate = false) {
  const errors = [];

  // Title validation - required for creation, optional for updates
  if (!isUpdate && (!taskData.title || typeof taskData.title !== "string")) {
    errors.push("Title is required and must be a string");
  }

  if (taskData.title && typeof taskData.title !== "string") {
    errors.push("Title must be a string");
  }

  // Description validation - always optional but must be string if provided
  if (taskData.description && typeof taskData.description !== "string") {
    errors.push("Description must be a string");
  }

  // Status validation - must be one of the valid enum values if provided
  if (taskData.status && !taskEnum.status.includes(taskData.status)) {
    errors.push(`Status must be one of: ${taskEnum.status.join(', ')}`);
  }

  return errors;
}