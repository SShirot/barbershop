const express = require('express');
const router = express.Router();
const productLabelController = require('../../controllers/admin/productLabelController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, productLabelController.getAll);

// Get a specific menu by ID
router.get('/:id', auth,productLabelController.getById);

// Create a new menu
router.post('/', auth, productLabelController.create);

// Update a menu by ID
router.put('/:id', auth, productLabelController.update);

// Delete a menu by ID
router.delete('/:id',auth, productLabelController.delete);

module.exports = router;
