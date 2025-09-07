/**
 * @fileoverview Task Manager service for handling task CRUD operations and validation
 * Provides in-memory task storage and management functionality
 * @author Task Manager Team
 * @version 1.0.0
 */

const { uid } = require("uid");
const ValidationError = require("../errors/ValidationError");

/**
 * Task Manager class for handling task operations
 * Manages tasks using an in-memory Map for storage
 */
class TaskManager {
  /**
   * Create a new TaskManager instance
   * Initializes the in-memory task storage
   */
  constructor() {
    /** @type {Map<string, Object>} In-memory storage for tasks */
    this.tasks = new Map();
  }

  /**
   * Get all tasks from storage
   * @returns {Object[]} Array of all tasks
   */
  getAllTasks() {
    return [...this.tasks.values()];
  }

  /**
   * Get a specific task by ID
   * @param {string} id - Task ID to retrieve
   * @returns {Object|null} Task object if found, null otherwise
   */
  getTask(id) {
    return this.tasks.get(id) || null;
  }

  /**
   * Create a new task with validation
   * @param {Object} taskData - Task data to create
   * @param {string} taskData.title - Task title (required)
   * @param {string} [taskData.description] - Task description (optional)
   * @param {string} [taskData.status] - Task status (optional, defaults to 'pending')
   * @returns {Object} Created task object with generated ID and timestamps
   * @throws {ValidationError} If validation fails
   */
  createTask(taskData) {
    const validationErrors = this.validateTask(taskData);
    if (validationErrors.length > 0) {
      throw new ValidationError(validationErrors.join(', '));
    }

    const task = {
      id: uid(),
      title: taskData.title,
      description: taskData.description || "",
      status: taskData.status || "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(task.id, task);
    return task;
  }

  /**
   * Update an existing task with validation
   * @param {string} id - Task ID to update
   * @param {Object} taskData - Updated task data
   * @param {string} [taskData.title] - Updated task title
   * @param {string} [taskData.description] - Updated task description
   * @param {string} [taskData.status] - Updated task status
   * @returns {Object|null} Updated task object if found, null if task doesn't exist
   * @throws {ValidationError} If validation fails
   */
  updateTask(id, taskData) {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }

    const validationErrors = this.validateTask(taskData, true);
    if (validationErrors.length > 0) {
      throw new ValidationError(validationErrors.join(', '));
    }

    const updatedTask = {
      ...task,
      ...taskData,
      updatedAt: new Date().toISOString(),
    };

    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  /**
   * Delete a task by ID
   * @param {string} id - Task ID to delete
   * @returns {boolean} True if task was deleted, false if task was not found
   */
  deleteTask(id) {
    return this.tasks.delete(id);
  }

  /**
   * Get task statistics including total count and status breakdown
   * @returns {Object} Statistics object with total count and status counts
   * @returns {number} returns.total - Total number of tasks
   * @returns {Object} returns.byStatus - Task counts grouped by status
   * @returns {number} returns.byStatus.pending - Number of pending tasks
   * @returns {number} returns.byStatus['in progress'] - Number of in-progress tasks
   * @returns {number} returns.byStatus.completed - Number of completed tasks
   */
  getStats() {
    const tasks = this.getAllTasks();
    const stats = {
      total: tasks.length,
      byStatus: {
        pending: 0,
        'in progress': 0,
        completed: 0
      }
    };

    tasks.forEach(task => {
      if (stats.byStatus[task.status] !== undefined) {
        stats.byStatus[task.status]++;
      }
    });

    return stats;
  }

  /**
   * Validate task data according to business rules
   * @param {Object} taskData - Task data to validate
   * @param {boolean} [isUpdate=false] - Whether this is an update operation (makes title optional)
   * @returns {string[]} Array of validation error messages (empty if valid)
   * @private
   */
  validateTask(taskData, isUpdate = false) {
    const errors = [];
    const validStatuses = ['pending', 'in progress', 'completed'];

    // Title validation
    if (!isUpdate && (!taskData.title || typeof taskData.title !== "string")) {
      errors.push("Title is required and must be a string");
    }

    if (taskData.title && typeof taskData.title !== "string") {
      errors.push("Title must be a string");
    }

    // Description validation
    if (taskData.description && typeof taskData.description !== "string") {
      errors.push("Description must be a string");
    }

    // Status validation
    if (taskData.status && !validStatuses.includes(taskData.status)) {
      errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
    }

    return errors;
  }

  /**
   * Clear all tasks from storage (primarily for testing purposes)
   * @returns {void}
   */
  clearAll() {
    this.tasks.clear();
  }
}

module.exports = TaskManager;