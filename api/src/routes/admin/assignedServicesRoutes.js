const express = require('express');
const router = express.Router();
const assignedServicesController = require('../../controllers/admin/assignedServicesController');
const { verifyToken, isAdmin } = require('../../middleware/auth');

router.get('/unassigned', verifyToken, isAdmin, assignedServicesController.getUnassignedServices);
router.get('/staff-schedule', verifyToken, isAdmin, assignedServicesController.getStaffSchedule);
router.get('/staff-available-slots', verifyToken, isAdmin, assignedServicesController.getStaffAvailableSlots);
router.post('/assign', verifyToken, isAdmin, assignedServicesController.assignService);

module.exports = router; 