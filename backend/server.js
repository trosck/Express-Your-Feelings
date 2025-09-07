/**
 * @fileoverview Express server setup with Sentry error tracking, CORS support, and task management API
 * @author Task Manager Team
 * @version 1.0.0
 */

const Sentry = require("@sentry/node");

// Initialize Sentry for error tracking
Sentry.init({
  dsn: "https://387c370a4811c9b2d55e1bbaea9f6154@o4509533803839488.ingest.de.sentry.io/4509533807902800",
  sendDefaultPii: true,
});

const express = require("express");
const cors = require("cors");
const TaskManager = require("./services/TaskManager");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");

/**
 * Express server class for the Task Manager API
 * Handles server setup, middleware configuration, routing, and error handling
 */
class Server {
  /**
   * Create a new Server instance
   * Initializes Express app, TaskManager, and sets up middleware and routes
   */
  constructor() {
    this.app = express();
    this.taskManager = new TaskManager();
    this.port = process.env.PORT || 5000;

    this.setupRoutes();
    Sentry.setupExpressErrorHandler(this.app);
    this.setupMiddleware();
    this.setupErrorHandling();
  }

  /**
   * Set up middleware for CORS, JSON parsing, and request logging
   * @private
   */
  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger.requestLogger);
  }

  /**
   * Set up application routes including task routes, health check, and root endpoint
   * @private
   */
  setupRoutes() {
    this.app.use("/tasks", taskRoutes(this.taskManager));

    // Health check endpoint
    this.app.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      });
    });

    // Root endpoint
    this.app.get("/", (req, res) => {
      res.status(200).json({
        message: "Express Your Feelings - Task Manager API",
        version: "1.0.0",
        endpoints: {
          tasks: "/tasks",
          health: "/health"
        }
      });
    });
  }

  /**
   * Set up error handling middleware for 404 and global error handling
   * @private
   */
  setupErrorHandling() {
    this.app.use(errorHandler.notFound);
    this.app.use(errorHandler.globalError);
  }

  /**
   * Start the Express server and listen on the configured port
   * Logs server startup information including port and available endpoints
   */
  start() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 Server is running on port ${this.port}`);
      logger.info(`📋 API Documentation: http://localhost:${this.port}`);
      logger.info(`🏥 Health Check: http://localhost:${this.port}/health`);
    });
  }
}

// Start server if this file is run directly
if (require.main === module) {
  const server = new Server();
  server.start();
}

module.exports = Server;