/**
 * @fileoverview Express routes for task management operations
 * Provides RESTful API endpoints for CRUD operations on tasks
 * @author Task Manager Team
 * @version 1.0.0
 */

const express = require('express');
const logger = require('../utils/logger');

/**
 * Create and configure task routes with the provided TaskManager instance
 * @param {TaskManager} taskManager - Task manager instance for handling task operations
 * @returns {express.Router} Express router configured with task routes
 */
function taskRoutes(taskManager) {
  const router = express.Router();

  /**
   * GET /tasks - Retrieve all tasks
   * @route GET /tasks
   * @returns {Object[]} Array of all tasks
   * @returns {200} Success - Returns array of tasks
   */
  router.get('/', async (req, res) => {
    const tasks = taskManager.getAllTasks();
    logger.info(`Retrieved ${tasks.length} tasks`);
    res.status(200).json(tasks);
  });

  /**
   * GET /tasks/stats - Get task statistics
   * @route GET /tasks/stats
   * @returns {Object} Task statistics including total count and status breakdown
   * @returns {200} Success - Returns task statistics
   */
  router.get('/stats', async (req, res) => {
    const stats = taskManager.getStats();
    logger.info('Retrieved task statistics');
    res.status(200).json(stats);
  });

  /**
   * GET /tasks/:id - Retrieve a specific task by ID
   * @route GET /tasks/{id}
   * @param {string} req.params.id - Task ID
   * @returns {Object} Task object
   * @returns {200} Success - Returns the requested task
   * @returns {404} Not Found - Task with specified ID does not exist
   */
  router.get('/:id', async (req, res) => {
    const task = taskManager.getTask(req.params.id);
    if (!task) {
      logger.warn(`Task not found: ${req.params.id}`);
      return res.status(404).json({
        error: 'Task not found',
        message: `Task with ID ${req.params.id} does not exist`
      });
    }
    logger.info(`Retrieved task: ${req.params.id}`);
    res.status(200).json(task);
  });

  /**
   * POST /tasks - Create a new task
   * @route POST /tasks
   * @param {Object} req.body - Task data
   * @param {string} req.body.title - Task title (required)
   * @param {string} [req.body.description] - Task description (optional)
   * @param {string} [req.body.status] - Task status (optional, defaults to 'pending')
   * @returns {Object} Created task object
   * @returns {201} Created - Returns the newly created task
   * @returns {400} Bad Request - Validation error
   */
  router.post('/', async (req, res) => {
    const task = taskManager.createTask(req.body);
    logger.info(`Task created: ${task.id}`);
    res.status(201).json(task);
  });

  /**
   * PUT /tasks/:id - Update an existing task
   * @route PUT /tasks/{id}
   * @param {string} req.params.id - Task ID
   * @param {Object} req.body - Updated task data
   * @param {string} [req.body.title] - Updated task title
   * @param {string} [req.body.description] - Updated task description
   * @param {string} [req.body.status] - Updated task status
   * @returns {Object} Updated task object
   * @returns {200} Success - Returns the updated task
   * @returns {404} Not Found - Task with specified ID does not exist
   * @returns {400} Bad Request - Validation error
   */
  router.put('/:id', async (req, res) => {
    const task = taskManager.updateTask(req.params.id, req.body);
    if (!task) {
      logger.warn(`Task not found for update: ${req.params.id}`);
      return res.status(404).json({
        error: 'Task not found',
        message: `Task with ID ${req.params.id} does not exist`
      });
    }
    logger.info(`Task updated: ${req.params.id}`);
    res.status(200).json(task);
  });

  /**
   * DELETE /tasks/:id - Delete a task
   * @route DELETE /tasks/{id}
   * @param {string} req.params.id - Task ID
   * @returns {Object} Deletion confirmation message
   * @returns {200} Success - Task deleted successfully
   * @returns {404} Not Found - Task with specified ID does not exist
   */
  router.delete('/:id', async (req, res) => {
    const hasDeleted = taskManager.deleteTask(req.params.id);
    if (!hasDeleted) {
      logger.warn(`Task not found for deletion: ${req.params.id}`);
      return res.status(404).json({
        error: 'Task not found',
        message: `Task with ID ${req.params.id} does not exist`
      });
    }
    logger.info(`Task deleted: ${req.params.id}`);
    res.status(200).json({
      message: 'Task deleted successfully',
      id: req.params.id
    });
  });

  return router;
}

module.exports = taskRoutes;