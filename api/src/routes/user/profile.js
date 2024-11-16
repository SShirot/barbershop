const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const profileController = require('../../controllers/user/profileController');

/**
 * @swagger
 * tags:
 *   name: User Profile
 *   description: User profile management
 */

/**
 * @swagger
 * /api/user/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 */
router.get('/', auth, profileController.getProfile);


/**
 * @swagger
 * /api/user/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [User Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user profile
 *       400:
 *         description: Invalid data
 *       401:
 *         description: No token, authorization denied
 *       403:
 *         description: Token is not valid
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/', auth, profileController.updateProfile);

module.exports = router;
