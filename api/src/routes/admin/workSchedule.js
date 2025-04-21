const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const controller = require('../../controllers/admin/workScheduleController');

router.get('/', auth, controller.getAll);
router.get('/staff-list', auth, controller.getStaffList);
router.get('/staff', auth, controller.getStaffSchedule);
router.get('/:id', auth, controller.findById);
router.post('/', auth, controller.create);
router.put('/:id', auth, controller.update);
router.delete('/:id', auth, controller.delete);
router.get('/available-staff', auth, controller.getAvailableStaff);
router.post('/:id/approve', auth, controller.approve);
router.post('/:id/reject', auth, controller.reject);

module.exports = router; 