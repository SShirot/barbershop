const express = require('express');
const router = express.Router();
const slideController = require('../../controllers/admin/slideController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, slideController.getAll);

// Get a specific menu by ID
router.get('/:id', auth,slideController.getById);

// Create a new menu
router.post('/', auth, slideController.create);

// Update a menu by ID
router.put('/:id', auth, slideController.update);

// Delete a menu by ID
router.delete('/:id',auth, slideController.delete);

module.exports = router;
