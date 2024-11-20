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

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalAmount:
 *                 type: number
 *                 description: The total amount of the order
 *               guestInfo:
 *                 type: object
 *                 description: Guest information (required if not logged in)
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Guest name
 *                   email:
 *                     type: string
 *                     description: Guest email
 *                   phone:
 *                     type: string
 *                     description: Guest phone number
 *               transactions:
 *                 type: array
 *                 description: The list of transactions
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: The product ID
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the product
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *     responses:
 *       201:
 *         description: Successfully created a new order
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
 *                     order:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: The order ID
 *                         totalAmount:
 *                           type: number
 *                           description: The total amount of the order
 *                         status:
 *                           type: string
 *                           description: The order status
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                         guestInfo:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             email:
 *                               type: string
 *                             phone:
 *                               type: string
 *                     transactions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The transaction ID
 *                           product:
 *                             type: string
 *                             description: The product ID
 *                           quantity:
 *                             type: number
 *                           price:
 *                             type: number
 *       500:
 *         description: Server error
 */

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


module.exports = router;
