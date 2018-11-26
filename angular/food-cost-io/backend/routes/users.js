const express = require('express');
const router = express.Router();

// moved the user routes to a controllers directory in the backend

const UserController = require('../controllers/users');

router.post('/signup', UserController.createUser);
router.post('/login', UserController.loginUser);
// export the router
module.exports = router;
