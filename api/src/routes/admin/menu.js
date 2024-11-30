const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/menuController');
const auth = require("../../middleware/auth");

// Get all
router.get('/', auth, controller.getAll);

// find by ID
router.get('/:id', auth,controller.findById);

// Create
router.post('/', auth, controller.create);

// Update
router.put('/:id', auth, controller.update);

// Delete
router.delete('/:id',auth, controller.delete);

module.exports = router;
