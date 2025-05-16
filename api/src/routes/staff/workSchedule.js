const express = require('express');
const router = express.Router();
const controller = require('../../controllers/staff/workScheduleController');
const  auth = require('../../middleware/auth');

// Lấy lịch làm việc của staff
router.get('/schedule', auth, controller.getStaffSchedule);

// Đăng ký ca làm việc
router.post('/register', auth, controller.registerSchedule);

// Lấy danh sách ca làm việc còn trống
router.get('/available-shifts', auth, controller.getAvailableShifts);

// Lấy chi tiết một ca làm việc
router.get('/schedule/:schedule_id', auth, controller.getScheduleDetails);

// Hủy đăng ký ca làm việc
router.delete('/schedule/:schedule_id', auth, controller.cancelSchedule);

module.exports = router; 