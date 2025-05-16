const express = require('express');
const router = express.Router();
const serviceController = require('../../controllers/staff/serviceController');
const auth = require("../../middleware/auth");

// Get all menus
router.get('/', auth, serviceController.getAllServices);
router.get('/register', auth, serviceController.getAllServicesRegister);
router.get('/staff', auth, serviceController.getServiceByStaffId);
router.delete('/register/:id', auth, serviceController.deleteServiceUser);

// Get a specific menu by ID
router.get('/:id', auth,serviceController.getServiceById);

// Create a new menu
router.post('/', auth, serviceController.createService);

// Update a menu by ID
router.put('/:id', auth, serviceController.updateService);

// Delete a menu by ID
router.delete('/:id',auth, serviceController.deleteService);

module.exports = router;
