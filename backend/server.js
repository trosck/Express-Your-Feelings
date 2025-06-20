const express = require("express");
const cors = require("cors");
const TaskManager = require("./services/TaskManager");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./utils/logger");

class Server {
  constructor() {
    this.app = express();
    this.taskManager = new TaskManager();
    this.port = process.env.PORT || 5000;

    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  /**
   * Set up middleware
   */
  setupMiddleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(logger.requestLogger);
  }

  /**
   * Set up routes
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
   * Set up error handling
   */
  setupErrorHandling() {
    this.app.use(errorHandler.notFound);
    this.app.use(errorHandler.globalError);
  }

  /**
   * Start the server
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