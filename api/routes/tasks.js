const router = require('express').Router();

const Task = require('../controllers/tasks');

// GET /task
router.get('/', Task.getTask);

// GET /tasks/priorities
router.get('/priorities', Task.getTaskPriorities);

// GET /tasks/statuses
router.get('/statuses', Task.getTaskStatuses);

// GET /task/:id
router.get('/:id', Task.getTaskById);

// POST /task
router.post('/', Task.createTask);

// DELETE /:id
router.delete('/:id', Task.removeTask);

// PUT /task/:id
router.put('/:id', Task.updateTask);

module.exports = router;