const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validation');
const orderController = require('../../controllers/guest/orderController');

/**
 * Middleware để kiểm tra thông tin khách hàng nếu người dùng chưa đăng nhập.
 */
const guestInfoValidation = [
    check('guestInfo.name', 'Guest name is required').not().isEmpty(),
    check('guestInfo.email', 'Guest email is required').isEmail(),
    check('guestInfo.phone', 'Guest phone is required').not().isEmpty(),
];

router.post(
    '/',
    [
        auth,
        // check('phoneNumber', 'Phone number is required').not().isEmpty(),
        // check('appointmentDetails', 'Appointment details are required').not().isEmpty(),
    ],
    validate,
    orderController.createOrder
);

router.get('/', auth, orderController.getAll);
router.post('/update-status-payment', auth, orderController.updateStatusPayment);

module.exports = router;
