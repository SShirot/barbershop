const express = require('express');
const router = express.Router();
const tagController = require('../../controllers/admin/tagController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, tagController.getAll);

// Get a specific menu by ID
router.get('/:id', auth,tagController.getById);

// Create a new menu
router.post('/', auth, tagController.create);

// Update a menu by ID
router.put('/:id', auth, tagController.update);

// Delete a menu by ID
router.delete('/:id',auth, tagController.delete);

module.exports = router;
