const { uid } = require("uid");

// Valid task statuses
const VALID_STATUSES = ['pending', 'in progress', 'completed'];

class TaskManager {
  constructor() {
    this.tasks = new Map();
  }

  /**
   * Validate task data
   * @param {Object} taskData - Task data to validate
   * @param {boolean} isUpdate - Whether this is an update operation
   * @returns {Array} - Array of validation errors
   */
  validateTask(taskData, isUpdate = false) {
    const errors = [];

    if (!isUpdate && (!taskData.title || typeof taskData.title !== "string")) {
      errors.push("Title is required and must be a string");
    }

    if (taskData.title && typeof taskData.title !== "string") {
      errors.push("Title must be a string");
    }

    if (taskData.description && typeof taskData.description !== "string") {
      errors.push("Description must be a string");
    }

    if (taskData.status && !VALID_STATUSES.includes(taskData.status)) {
      errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}`);
    }

    return errors;
  }

  /**
   * Get all tasks
   * @returns {Array} - Array of all tasks
   */
  getAllTasks() {
    return [...this.tasks.values()];
  }

  /**
   * Get a task by ID
   * @param {string} id - Task ID
   * @returns {Object|null} - Task object or null if not found
   */
  getTask(id) {
    return this.tasks.get(id) || null;
  }

  /**
   * Create a new task
   * @param {Object} taskData - Task data to create
   * @returns {Object} - Created task object
   * @throws {Error} - If validation fails
   */
  createTask(taskData) {
    const validationErrors = this.validateTask(taskData);
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
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
   * Update a task
   * @param {string} id - Task ID
   * @param {Object} taskData - Task data to update
   * @returns {Object|null} - Updated task object or null if not found
   * @throws {Error} - If validation fails
   */
  updateTask(id, taskData) {
    const task = this.tasks.get(id);
    if (!task) {
      return null;
    }

    const validationErrors = this.validateTask(taskData, true);
    if (validationErrors.length > 0) {
      throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
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
   * Delete a task
   * @param {string} id - Task ID
   * @returns {boolean} - True if task was deleted, false if not found
   */
  deleteTask(id) {
    return this.tasks.delete(id);
  }

  /**
   * Get task statistics
   * @returns {Object} - Statistics about tasks
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
   * Clear all tasks (for testing purposes)
   */
  clearAll() {
    this.tasks.clear();
  }
}

module.exports = TaskManager; 