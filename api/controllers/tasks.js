const TaskService = require("../services/tasks");

const getTask = async (req, res) => {
  const { query } = req;
  const name = query.name;

  try {
    const tasks = await TaskService.getAllTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

const getTaskById = async (req, res) => {
  const { params } = req;
  const id = params.id;

  try {
    const task = await TaskService.getTaskById(id);
    res.json(task);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

const getTaskPriorities = (req, res) => {
  try {
      const priorities = TaskService.getTaskPriorities();
      res.json(priorities);
  } catch (error) {
      res.status(500).json(error);
  }
};

const getTaskStatuses = (req, res) => {
  try {
      const status = TaskService.getTaskStatuses();
      res.json(status);
  } catch (error) {
      res.status(500).json(error);
  }
};

const createTask = async (req, res) => {
  const { body } = req;

  try {
      const task = await TaskService.createTask(body);
      res.json(task);
  } catch (error) {
      res.status(500).send({ error: error.toString() });
  }
};

const updateTask = async (req, res) => {
  const {
      body,
      params: { id },
  } = req;

  try {
      const task = await TaskService.updateTask(id, body);
      res.json(task);
  } catch (error) {
      res.status(500).send({ error: error.toString() });
  }
};

const removeTask = async (req, res) => {
  const {
      params: { id },
  } = req;

  try {
      const task = await TaskService.removeTask(id);
      res.json(task);
  } catch (error) {
      res.status(500).send({ error: error.toString() });
  }
};

module.exports = {
    getTask,
    getTaskById,
    createTask,
    removeTask,
    updateTask,
    getTaskPriorities,
    getTaskStatuses
}
