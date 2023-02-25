const router = require('express').Router();

const Project = require('../controllers/projects');

// GET /projects
router.get('/', Project.getProject);

// POST /projects
router.post('/', Project.createProject);

// GET /projects/:id
router.get('/:id', Project.getProjectById);

// GET /projects/users/:id
router.get('/users/:id', Project.getProjectByUsers);

// PUT /projects/:id
router.put('/:id', Project.updateProject);

module.exports = router;
