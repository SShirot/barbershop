const express = require('express');
const router = express.Router();
const controller = require('../../controllers/admin/assignedServicesController');
const  verifyToken  = require('../../middleware/auth');

// Get all assigned services
router.get('/', verifyToken, controller.getAll);

router.get('/services-user', verifyToken, controller.findAllWithDetails);

router.post('/services-user', verifyToken, controller.assignService);
// Get assigned service by ID
router.get('/:id', verifyToken, controller.findById);

// Create new assigned service
router.post('/', verifyToken, controller.create);

// Update assigned service
router.put('/:id', verifyToken, controller.update);

// Delete assigned service
router.delete('/:id', verifyToken, controller.delete);

// Get staff assignments for a specific date
router.get('/staff/:staff_id/date/:date', verifyToken, controller.getStaffAssignments);

// Get unassigned services
router.get('/unassigned', verifyToken, controller.getUnassignedServices);

// Get staff schedule
router.get('/staff/:staff_id/schedule', verifyToken, controller.getStaffSchedule);

// Get staff available slots
router.get('/staff-available-slots', verifyToken, controller.getStaffAvailableSlots);

// Get available staffb for a service and date
router.get('/available-staff', verifyToken, controller.getAvailableStaff);

// Register new service request (for users)
router.post('/register', controller.registerService);

// Approve service request
router.post('/:id/approve', verifyToken, controller.approveService);

// Reject service request
router.post('/:id/reject', verifyToken, controller.rejectService);

// Complete service request
router.post('/:id/complete', verifyToken, controller.completeService);


// Update assignment status
//router.put('/:id/status', verifyToken, controller.updateStatus);

module.exports = router; 