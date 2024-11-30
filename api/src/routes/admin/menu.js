const express = require('express');
const router = express.Router();
const menuController = require('../../controllers/admin/menuController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, menuController.getAllMenus);

// Get a specific menu by ID
router.get('/:id', auth,menuController.getMenuById);

// Create a new menu
router.post('/', auth, menuController.createMenu);

// Update a menu by ID
router.put('/:id', auth, menuController.updateMenu);

// Delete a menu by ID
router.delete('/:id',auth, menuController.deleteMenu);

module.exports = router;
