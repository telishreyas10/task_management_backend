const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  name: String,
  details: String,
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
  },
  status: {
    type: String,
    enum: ["assigned", "in progress", "in review", "completed"],
  },
  timeline: {
    assigned_date: Date,
    due_date: Date,
    last_updated_date: Date,
  },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
