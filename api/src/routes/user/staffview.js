const express = require('express');
const router = express.Router();
const StaffController = require('../../controllers/user/staffController');

// Lấy danh sách staff
router.get('/', StaffController.getStaffList);

// Lấy danh sách staff theo ngày và giờ
router.get('/by-date', StaffController.getStaffListByDate);

module.exports = router; 