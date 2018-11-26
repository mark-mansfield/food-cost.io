const express = require('express');
const router = express.Router();

// moved the menu routes to a controller directory in the backend
const MenusController = require('../controllers/menus');
router.get('/:custID', MenusController.getMenus);

// export the router
module.exports = router;
