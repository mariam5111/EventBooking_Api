const express = require('express');

const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  updateBooking,
  cancelBooking,
  deleteBooking,
} = require('../controllers/booking.controller');

const {
  createBookingValidator,
  updateBookingValidator,
} = require('../validators/booking.validator');

const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - seats
 *             properties:
 *               eventId:
 *                 type: string
 *               seats:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking created
 *       400:
 *         description: Not enough seats
 *       404:
 *         description: Event not found
 */
router.post(
  '/',
  protect,
  createBookingValidator,
  createBooking
);

/**
 * @swagger
 * /bookings/my-bookings:
 *   get:
 *     summary: Get logged-in user's bookings
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user bookings
 */
router.get(
  '/my-bookings',
  protect,
  getMyBookings
);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get a booking by ID (Owner/Organizer/Admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking found
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Booking not found
 */
router.get(
  '/:id',
  protect,
  getBookingById
);

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Get all bookings (Admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All bookings
 *       403:
 *         description: Forbidden
 */
router.get(
  '/',
  protect,
  restrictTo('Admin'),
  getAllBookings
);

/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update seats for a booking (Owner/Organizer/Admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seats
 *             properties:
 *               seats:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Booking updated
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Booking not found
 */
router.put(
  '/:id',
  protect,
  updateBookingValidator,
  updateBooking
);

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking (Owner/Organizer/Admin)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking cancelled
 *       403:
 *         description: Not authorized
 *       404:
 *         description: Booking not found
 */
router.patch(
  '/:id/cancel',
  protect,
  cancelBooking
);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Delete a booking (Admin only)
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking deleted
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Booking not found
 */
router.delete(
  '/:id',
  protect,
  restrictTo('Admin'),
  deleteBooking
);

module.exports = router;