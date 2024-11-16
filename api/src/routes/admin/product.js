const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/productController');
const auth = require('../../middleware/auth');

// Get all menus
router.get('/', auth, productController.getAll);

// Get a specific menu by ID
router.get('/:id', auth,productController.getById);

// Create a new menu
router.post('/', auth, productController.create);

// Update a menu by ID
router.put('/:id', auth, productController.update);

// Delete a menu by ID
router.delete('/:id',auth, productController.delete);

module.exports = router;
