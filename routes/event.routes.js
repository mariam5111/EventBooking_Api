const express = require("express");
const eventController = require("../controllers/event.controller");
const {
  createEventValidation,
  updateEventValidation,
} = require("../validators/event.validator");
const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictTo");

const router = express.Router();

// Public routes — anyone can browse events without logging in
router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEvent);

// Protected routes — Organizer/Admin only
router.post(
  "/",
  protect,
  restrictTo("Organizer", "Admin"),
  createEventValidation,
  eventController.createEvent
);

router.put(
  "/:id",
  protect,
  restrictTo("Organizer", "Admin"),
  updateEventValidation,
  eventController.updateEvent
);

router.delete(
  "/:id",
  protect,
  restrictTo("Organizer", "Admin"),
  eventController.deleteEvent
);

module.exports = router;