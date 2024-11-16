const express = require('express');
const router = express.Router();
const postController = require('../../controllers/admin/postController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, postController.getAll);

// Get a specific menu by ID
router.get('/:id', auth,postController.getById);

// Create a new menu
router.post('/', auth, postController.create);

// Update a menu by ID
router.put('/:id', auth, postController.update);

// Delete a menu by ID
router.delete('/:id',auth, postController.delete);

module.exports = router;
