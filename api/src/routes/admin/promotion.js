const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validation');
const promotionController = require('../../controllers/admin/promotionController');

/**
 * @swagger
 * tags:
 *   name: Admin Promotions
 *   description: Admin promotion management
 */

/**
 * @swagger
 * /admin/promotions:
 *   get:
 *     summary: Get all promotions
 *     tags: [Admin Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         required: false
 *         schema:
 *           type: integer
 *       - name: page_size
 *         in: query
 *         description: Number of items per page
 *         required: false
 *         schema:
 *           type: integer
 *       - name: search_name
 *         in: query
 *         description: Search promotions by name
 *         required: false
 *         schema:
 *           type: string
 *       - name: search_type
 *         in: query
 *         description: Search promotions by type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [gift, discount]
 *     responses:
 *       200:
 *         description: Successfully retrieved all promotions
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
 *                     promotions:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The promotion ID
 *                           name:
 *                             type: string
 *                             description: The promotion name
 *                           type:
 *                             type: string
 *                             description: The promotion type
 *                           value:
 *                             type: number
 *                             description: The promotion value
 *                           description:
 *                             type: string
 *                             description: The promotion description
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: The date the promotion was created
 *                     meta:
 *                       type: object
 *                       properties:
 *                         total:
 *                           type: integer
 *                         total_page:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         page_size:
 *                           type: integer
 *       500:
 *         description: Server error
 */
router.get('/', auth, promotionController.getAllPromotions);

/**
 * @swagger
 * /admin/promotions:
 *   post:
 *     summary: Create a new promotion
 *     tags: [Admin Promotions]
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
 *                 description: The promotion name
 *               type:
 *                 type: string
 *                 description: The promotion type (gift or discount)
 *               value:
 *                 type: number
 *                 description: The promotion value
 *               description:
 *                 type: string
 *                 description: The promotion description
 *     responses:
 *       201:
 *         description: Successfully created a new promotion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The promotion ID
 *                 name:
 *                   type: string
 *                   description: The promotion name
 *                 type:
 *                   type: string
 *                   description: The promotion type
 *                 value:
 *                   type: number
 *                   description: The promotion value
 *                 description:
 *                   type: string
 *                   description: The promotion description
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the promotion was created
 *       500:
 *         description: Server error
 */
router.post(
    '/',
    [
        auth
    ],
    validate,
    promotionController.createPromotion
);

/**
 * @swagger
 * /admin/promotions/{id}:
 *   get:
 *     summary: Get a promotion by ID
 *     tags: [Admin Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the promotion to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the promotion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The promotion ID
 *                 name:
 *                   type: string
 *                   description: The promotion name
 *                 type:
 *                   type: string
 *                   description: The promotion type
 *                 value:
 *                   type: number
 *                   description: The promotion value
 *                 description:
 *                   type: string
 *                   description: The promotion description
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the promotion was created
 *       404:
 *         description: Promotion not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, promotionController.getPromotionById);

/**
 * @swagger
 * /admin/promotions/{id}:
 *   put:
 *     summary: Update an existing promotion
 *     tags: [Admin Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the promotion to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The promotion name
 *               type:
 *                 type: string
 *                 description: The promotion type (gift or discount)
 *               value:
 *                 type: number
 *                 description: The promotion value
 *               description:
 *                 type: string
 *                 description: The promotion description
 *     responses:
 *       200:
 *         description: Successfully updated the promotion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The promotion ID
 *                 name:
 *                   type: string
 *                   description: The promotion name
 *                 type:
 *                   type: string
 *                   description: The promotion type
 *                 value:
 *                   type: number
 *                   description: The promotion value
 *                 description:
 *                   type: string
 *                   description: The promotion description
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date the promotion was created
 *       404:
 *         description: Promotion not found
 *       500:
 *         description: Server error
 */
router.put(
    '/:id',
    [
        auth
    ],
    validate,
    promotionController.updatePromotion
);

/**
 * @swagger
 * /admin/promotions/{id}:
 *   delete:
 *     summary: Delete an existing promotion
 *     tags: [Admin Promotions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the promotion to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the promotion
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, promotionController.deletePromotion);

module.exports = router;
