const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../../controllers/auth/authController');

router.post(
    '/register',
    [
        check('name', 'Tên là bắt buộc').not().isEmpty(),
        check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
        check('password', 'Vui lòng nhập mật khẩu có 6 ký tự trở lên').isLength({ min: 6 })
    ],
    authController.register
);

router.post(
    '/login',
    [
        check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
        check('password', 'Mật khẩu là bắt buộc').exists()
    ],
    authController.login
);

router.post(
    '/forgot-password',
    [
        check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
    ],
    authController.forgotPassword
);
router.post(
    '/reset-password',
    authController.resetPassword
);
router.post(
    '/verify/:token',
    authController.verifyAccount
);

module.exports = router;
