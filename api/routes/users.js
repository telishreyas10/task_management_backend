const router = require('express').Router();

const User = require('../controllers/users');

// GET /user
router.get('/', User.getUser);

// GET /user/:id
router.get('/:id', User.getUserById);

// PUT /user/:id
router.put('/:id', User.updateUser);

module.exports = router;