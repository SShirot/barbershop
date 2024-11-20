const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../../controllers/auth/authController');

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: Tên người dùng
 *         email:
 *           type: string
 *           description: Email của người dùng
 *         password:
 *           type: string
 *           description: Mật khẩu của người dùng
 *         role:
 *           type: string
 *           description: Vai trò của người dùng (bác sĩ, khách hàng, admin)
 *       example:
 *         name: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         role: customer
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: API quản lý xác thực
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Đăng ký người dùng mới
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Người dùng đã được tạo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc người dùng đã tồn tại
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Người dùng đã tồn tại
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Lỗi máy chủ
 */
router.post(
    '/register',
    [
        check('name', 'Tên là bắt buộc').not().isEmpty(),
        check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
        check('password', 'Vui lòng nhập mật khẩu có 6 ký tự trở lên').isLength({ min: 6 })
    ],
    authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập người dùng
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email của người dùng
 *               password:
 *                 type: string
 *                 description: Mật khẩu của người dùng
 *     responses:
 *       200:
 *         description: Người dùng đã đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         role:
 *                           type: string
 *                 message:
 *                   type: string
 *                   example: Đăng nhập thành công
 *       400:
 *         description: Thông tin không hợp lệ hoặc mật khẩu không đúng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Người dùng không tồn tại hoặc mật khẩu không đúng
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: []
 *                 message:
 *                   type: string
 *                   example: Lỗi máy chủ
 */
router.post(
    '/login',
    [
        check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
        check('password', 'Mật khẩu là bắt buộc').exists()
    ],
    authController.login
);

module.exports = router;
