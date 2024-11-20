const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/admin/serviceController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, serviceController.getAllServices);

// Get a specific menu by ID
router.get('/:id', auth,serviceController.getServiceById);

// Create a new menu
router.post('/', auth, serviceController.createService);

// Update a menu by ID
router.put('/:id', auth, serviceController.updateService);

// Delete a menu by ID
router.delete('/:id',auth, serviceController.deleteService);

module.exports = router;
