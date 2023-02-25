const ProjectService = require('../services/projects');

const getProject = async (req, res) => {
    const { query } = req;
    const name = query.name;

    try {
        if (name) {
            const matches = await ProjectService.getProjectByName(name);
            res.json(matches);
        } else {
            const projects = await ProjectService.getAllProjects();
            res.json(projects);
        }
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const createProject = async (req, res) => {
    const { body } = req;

    try {
        const project = await ProjectService.createProject(body);
        res.json(project);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const getProjectById = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const project = await ProjectService.getProjectById(id);
        res.json(project);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const getProjectByUsers = async (req, res) => {
    const { params } = req;
    const id = params.id;

    try {
        const project = await ProjectService.getProjectOfUser(id);
        res.json(project);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

const updateProject = async (req, res) => {
    const {
        body,
        params: { id },
    } = req;

    try {
        const project = await ProjectService.updateProject(id, body);
        res.json(project);
    } catch (error) {
        res.status(500).send({ error: error.toString() });
    }
};

module.exports = {
    getProject,
    createProject,
    getProjectById,
    updateProject,
    getProjectByUsers
};