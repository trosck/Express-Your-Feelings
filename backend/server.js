const express = require("express");
const { uid } = require("uid");
const app = express();

const task = {
  title: String,
  description: String,
  status: String,
};

const port = process.env.PORT || 5000;

const tasks = new Map();

app.use(express.json());

/**
 * Get all tasks
 */
app.get("/tasks", (req, res) => {
  return res.status(200).send([...tasks.values()]);
});

/**
 * Get one task
 */
app.get("/tasks/:id", (req, res) => {
  const task = tasks.get(req.params.id);

  if (!task) {
    return res.sendStatus(404);
  }

  return res.status(200).send(task);
});

/**
 * Update task
 */
app.put("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const task = tasks.get(id);

  if (!task) {
    return res.sendStatus(404);
  }

  Object.assign(task, req.body);

  return res.status(200).send(task);
});

/**
 * Create task
 */
app.post("/tasks", (req, res) => {
  const task = { ...req.body };
  const id = uid();

  task.id = id;

  tasks.set(id, task);

  return res.status(201).send(task);
});

/**
 * Delete task
 */
app.delete("/tasks/:id", (req, res) => {
  const hasDeleted = tasks.delete(req.params.id);

  if (!hasDeleted) {
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;
