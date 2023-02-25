const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      index: { unique: true },
    },
    description: String,
    repository: String,
    manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  {
    // ensure `res.json()` include virtuals
    toJSON: { virtuals: true },
    // ensure `console.log()` include virtuals
    toObject: { virtuals: true },
  }
);

ProjectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
