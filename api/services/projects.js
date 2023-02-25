const SharedService = require("../services/shared");
const Project = require("../models/project");

const getAllProjects = async () => await SharedService.all(Project);

const getProjectByName = async (searchTerm) => {
  const matches = await Project.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  return matches;
};

const createProject = async (body) => await SharedService.create(Project, body);

const getProjectById = async (id) =>
  await Project.findById(id).populate([
    "manager",
    "users",
    {
      path: "tasks",
      select: ["name", "details", "status","priority","assignee"],
      populate:[{path: "assignee"}]
    },
  ]);

const getProjectOfUser = async (users) => {
  if (users instanceof Array) {
    return await Project.find({ users: [...users] }).populate([
      {
        path: "tasks",
        select: ["name", "details", "status","priority"],
      },
    ]);
  } else {
    return await Project.find({ manager: users }).populate([
      "manager",
      {
        path: "tasks",
        select: ["name", "details", "status"],
      },
    ]);
  }
};

const updateProject = async (id, body) => {
  const { users, ...project } = body;

  // when updating a project ensure manager and associated users can be assigned to the project
  let projectData;

  if (project.manager) {
    projectData = await getProjectOfUser(project.manager);
    if (projectData.length !== 0 && projectData[0].id !== id) {
      throw new Error(`Selected Manager cannot be assigned to project.`);
    }
  }

  if (users) {
    projectData = await getProjectOfUser(users);

    if (projectData.length !== 0 && projectData[0].id !== id) {
      throw new Error(`Selected Users cannot be assigned to project.`);
    }
  }

  const updated = await Project.findByIdAndUpdate(id, {$set: body}, {
    returnDocument: "after",
    runValidators: true
  });
  return updated;
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectById,
  getProjectByName,
  updateProject,
  getProjectOfUser,
};
