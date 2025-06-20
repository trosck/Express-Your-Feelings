
const express = require("express");
const { uid } = require("uid");
const cors = require("cors");

// Task schema for validation
const TASK_SCHEMA = {
  title: String,
  description: String,
  status: String,
};

// Valid task statuses
const VALID_STATUSES = ['pending', 'in-progress', 'completed'];

class TaskManager {
  constructor() {
    this.tasks = new Map(); // Map to store tasks
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
      errors.push("Title is required and must be a string.");
    }

    if (taskData.description && typeof taskData.description !== "string") {
      errors.push("Description must be a string.");
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
   * @returns {Object} - Task object or null if not found
   */
  getTask(id) {
    return this.tasks.get(id);
  }

  /**
   * Create a new task
   * @param {Object} taskData - Task data to create
   * @returns {Object} - Created task object
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
   * @returns {Object} - Updated task object or null if not found
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
}

class Server {
  constructor() {
    this.app = express(); // Express application
    this.taskManager = new TaskManager(); // Task manager instance
    this.port = process.env.PORT || 5000; // Port to listen on

    this.setupMiddleware(); // Set up middleware
    this.setupRoutes(); // Set up routes
  }

  /**
   * Set up middleware
   */
  setupMiddleware() {
    this.app.use(cors()); // Enable CORS
    this.app.use(express.json()); // Parse JSON bodies
  }

  /**
   * Set up routes
   */
  setupRoutes() {
    /**
     * Get all tasks
     */
    this.app.get("/tasks", (req, res) => {
      try {
        const tasks = this.taskManager.getAllTasks();
        res.status(200).json(tasks);
      } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    /**
     * Get a task by ID
     */
    this.app.get("/tasks/:id", (req, res) => {
      try {
        const task = this.taskManager.getTask(req.params.id);
        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(task);
      } catch (error) {
        console.error('Error getting task:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    /**
     * Create a new task
     */
    this.app.post("/tasks", (req, res) => {
      try {
        const task = this.taskManager.createTask(req.body);
        console.log(`Task created: ${task.id}`);
        res.status(201).json(task);
      } catch (error) {
        console.error('Error creating task:', error);
        if (error.message.startsWith('Validation failed:')) {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    /**
     * Update a task
     */
    this.app.put("/tasks/:id", (req, res) => {
      try {
        const task = this.taskManager.updateTask(req.params.id, req.body);
        if (!task) {
          return res.status(404).json({ error: "Task not found" });
        }
        console.log(`Task updated: ${req.params.id}`);
        res.status(200).json(task);
      } catch (error) {
        console.error('Error updating task:', error);
        if (error.message.startsWith('Validation failed:')) {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Internal server error' });
      }
    });

    /**
     * Delete a task
     */
    this.app.delete("/tasks/:id", (req, res) => {
      try {
        const hasDeleted = this.taskManager.deleteTask(req.params.id);
        if (!hasDeleted) {
          return res.status(404).json({ error: "Task not found" });
        }
        console.log(`Task deleted: ${req.params.id}`);
        res.status(200).json({ message: "Task deleted successfully" });
      } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  }

  /**
   * Start the server
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.start();

module.exports = server.app;