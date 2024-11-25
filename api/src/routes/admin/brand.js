const express = require('express');
const router = express.Router();
const brandController = require('../../controllers/admin/brandController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, brandController.getAll);

// Get a specific menu by ID
router.get('/:id', auth,brandController.getById);

// Create a new menu
router.post('/', auth, brandController.create);

// Update a menu by ID
router.put('/:id', auth, brandController.update);

// Delete a menu by ID
router.delete('/:id',auth, brandController.delete);

module.exports = router;
