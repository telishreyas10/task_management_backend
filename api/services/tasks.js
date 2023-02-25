const SharedService = require("../services/shared");
const Task = require("../models/task");

const getAllTasks = async () => await SharedService.all(Task);

const getTaskById = async (id) =>
  await Task.findById(id).populate([
    "assignee",
    {
      path: "project",
      select: ["name"],
    },
  ]);

const getTaskPriorities = () => {
  return Task.schema.path("priority").enumValues;
};

const getTaskStatuses = () => {
  return Task.schema.path("status").enumValues;
};

const createTask = async (body) => await SharedService.create(Task, body);

const updateTask = async (id, body) => {
  const currentTask = await getTaskById(id); //Get task by id
  const status = currentTask.status;
  const projectId = JSON.stringify(currentTask.project._id);
  const userId = JSON.stringify(currentTask.assignee._id);

  // Project id & task id while updating task should match with exisiting project id in task
  if (
    projectId == JSON.stringify(body.project) &&
    userId == JSON.stringify(body.assignee)
  ) {
    let updatedTask = {};
    if (status === "assigned") {
      updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set: body },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );
    } else {
      updatedTask = await Task.findByIdAndUpdate(
        id,
        { $set: { status: body.status } },
        {
          returnDocument: "after",
          runValidators: true,
        }
      );
    }
    return updatedTask;
  } else {
    throw new Error(`Cannot update Task ${id}.`);
  }
};

const removeTask = async (id) => {
  const removed = await SharedService.remove(Task, id);
  return removed;
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  removeTask,
  updateTask,
  getTaskPriorities,
  getTaskStatuses
};
