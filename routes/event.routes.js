const express = require("express");
const eventController = require("../controllers/event.controller");
const {
  createEventValidation,
  updateEventValidation,
} = require("../validators/event.validator");
const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictTo");

const router = express.Router();

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events (public)
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get("/", eventController.getAllEvents);

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
router.get("/:id", eventController.getEvent);

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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - details
 *               - date
 *               - totalSeats
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
 *     responses:
 *       201:
 *         description: Event created
 *       403:
 *         description: Forbidden
 */
router.post(
  "/",
  protect,
  restrictTo("Organizer", "Admin"),
  createEventValidation,
  eventController.createEvent
);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event (Organizer/Admin only)
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Event not found
 *       403:
 *         description: Forbidden
 */
router.put(
  "/:id",
  protect,
  restrictTo("Organizer", "Admin"),
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
  "/:id",
  protect,
  restrictTo("Organizer", "Admin"),
  eventController.deleteEvent
);

module.exports = router;