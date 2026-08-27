const express = require('express');
const eventController = require('../controllers/event.controller');
const { upload } = require('../middleware/upload');
const {
  createEventValidation,
  updateEventValidation,
} = require('../validators/event.validator');
const protect = require('../middleware/protect');
const restrictTo = require('../middleware/restrictTo');

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events with search, filter, pagination (public)
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by title or details (case-insensitive)
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events from this date (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events up to this date (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of events per page
 *     responses:
 *       200:
 *         description: List of events with pagination
 */
router.get('/', eventController.getAllEvents);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get a single event by ID (public)
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
router.get('/:id', eventController.getEvent);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event (Organizer/Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - details
 *               - date
 *               - totalSeats
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               totalSeats:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: No images uploaded
 *       403:
 *         description: Forbidden
 */
router.post(
  '/',
  protect,
  restrictTo('Organizer', 'Admin'),
  upload.array('images', 5),
  createEventValidation,
  eventController.createEvent
);
/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event (Organizer/Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - details
 *               - date
 *               - totalSeats
 *               - images
 *             properties:
 *               title:
 *                 type: string
 *               details:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               totalSeats:
 *                 type: integer
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: No images uploaded
 *       403:
 *         description: Forbidden
 */
router.put(
  '/:id',
  protect,
  restrictTo('Organizer', 'Admin'),
  upload.array('images', 5),
  updateEventValidation,
  eventController.updateEvent
);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event (Organizer/Admin only)
 *     tags: [Events]
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
 *         description: Event deleted
 *       404:
 *         description: Event not found
 *       403:
 *         description: Forbidden
 */
router.delete(
  '/:id',
  protect,
  restrictTo('Organizer', 'Admin'),
  eventController.deleteEvent
);

module.exports = router;