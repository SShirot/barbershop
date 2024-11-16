const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminAppointmentController = require('../../controllers/admin/appointmentController');

/**
 * @swagger
 * tags:
 *   name: Admin Appointments
 *   description: Appointment management by admin
 */

/**
 * @swagger
 * /admin/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Admin Appointments]
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
 *     responses:
 *       200:
 *         description: Successfully retrieved all appointments
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
 *                     appointments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             description: The appointment ID
 *                           user:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               email:
 *                                 type: string
 *                           service:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                           date:
 *                             type: string
 *                             format: date-time
 *                             description: The appointment date
 *                           address:
 *                             type: string
 *                             description: The appointment address
 *                           isHomeVisit:
 *                             type: boolean
 *                             description: Whether the appointment is a home visit
 *                           status:
 *                             type: string
 *                             description: The appointment status
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
router.get('/', auth, adminAppointmentController.getAllAppointments);

// Xác nhận lịch hẹn
router.put('/:id/confirm', auth, adminAppointmentController.confirmAppointment);

// Hủy lịch hẹn
router.put('/:id/cancel', auth, adminAppointmentController.cancelAppointment);

// Đánh dấu hoàn thành lịch hẹn
router.put('/:id/complete', auth, adminAppointmentController.completeAppointment);

// Chuyển lịch hẹn sang trạng thái chờ xác nhận
router.put('/:id/pending', auth, adminAppointmentController.pendingAppointment);

module.exports = router;
