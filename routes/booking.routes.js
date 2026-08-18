const express = require("express");

const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  updateBooking,
  cancelBooking,
  deleteBooking,
} = require("../controllers/booking.controller");

const {
  createBookingValidator,
  updateBookingValidator,
} = require("../validators/booking.validator");

const protect = require("../middleware/protect");
const restrictTo = require("../middleware/restrictTo");

router.post(
  "/",
  protect,
  createBookingValidator,
  createBooking
);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

router.get(
  "/",
  protect,
  restrictTo("Admin"),
  getAllBookings
);

router.get(
  "/:id",
  protect,
  getBookingById
);

router.put(
  "/:id",
  protect,
  updateBookingValidator,
  updateBooking
);

router.patch(
  "/:id/cancel",
  protect,
  cancelBooking
);

router.delete(
  "/:id",
  protect,
  restrictTo("Admin"),
  deleteBooking
);


module.exports = router;