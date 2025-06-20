const express = require('express');
const logger = require('../utils/logger');

/**
 * Create task routes
 * @param {TaskManager} taskManager - Task manager instance
 * @returns {express.Router} - Express router
 */
function taskRoutes(taskManager) {
  const router = express.Router();

  /**
   * GET /tasks - Get all tasks
   */
  router.get('/', async (req, res) => {
    try {
      const tasks = taskManager.getAllTasks();
      logger.info(`Retrieved ${tasks.length} tasks`);
      res.status(200).json(tasks);
    } catch (error) {
      logger.error('Error getting tasks:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to retrieve tasks'
      });
    }
  });

  /**
   * GET /tasks/stats - Get task statistics
   */
  router.get('/stats', async (req, res) => {
    try {
      const stats = taskManager.getStats();
      logger.info('Retrieved task statistics');
      res.status(200).json(stats);
    } catch (error) {
      logger.error('Error getting task stats:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to retrieve task statistics'
      });
    }
  });

  /**
   * GET /tasks/:id - Get a task by ID
   */
  router.get('/:id', async (req, res) => {
    try {
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
    } catch (error) {
      logger.error('Error getting task:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to retrieve task'
      });
    }
  });

  /**
   * POST /tasks - Create a new task
   */
  router.post('/', async (req, res) => {
    try {
      const task = taskManager.createTask(req.body);
      logger.info(`Task created: ${task.id}`);
      res.status(201).json(task);
    } catch (error) {
      logger.error('Error creating task:', error);
      if (error.message.startsWith('Validation failed:')) {
        return res.status(400).json({ 
          error: 'Validation failed',
          message: error.message,
          details: error.message.replace('Validation failed: ', '').split(', ')
        });
      }
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to create task'
      });
    }
  });

  /**
   * PUT /tasks/:id - Update a task
   */
  router.put('/:id', async (req, res) => {
    try {
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
    } catch (error) {
      logger.error('Error updating task:', error);
      if (error.message.startsWith('Validation failed:')) {
        return res.status(400).json({ 
          error: 'Validation failed',
          message: error.message,
          details: error.message.replace('Validation failed: ', '').split(', ')
        });
      }
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to update task'
      });
    }
  });

  /**
   * DELETE /tasks/:id - Delete a task
   */
  router.delete('/:id', async (req, res) => {
    try {
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
    } catch (error) {
      logger.error('Error deleting task:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        message: 'Failed to delete task'
      });
    }
  });

  return router;
}

module.exports = taskRoutes; 