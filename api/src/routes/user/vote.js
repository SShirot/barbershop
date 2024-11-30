const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const voteController = require('../../controllers/user/voteController');

// Get all menus
router.get('/', auth, voteController.getAll);

// Get a specific menu by ID
router.get('/:id', auth,voteController.getById);

// Create a new menu
router.post('/', auth, voteController.create);

// Update a menu by ID
router.put('/:id', auth, voteController.update);

// Delete a menu by ID
router.delete('/:id',auth, voteController.delete);

module.exports = router;
