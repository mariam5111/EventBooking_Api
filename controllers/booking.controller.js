const bookingService = require("../services/booking.service");
const AppError = require("../utils/appError");

const createBooking = async (req, res, next) => {
  try {
    const { eventId, seats } = req.body;

    const booking = await bookingService.createBooking(
      req.user._id,
      eventId,
      seats
    );

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};


const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getMyBookings(req.user._id);

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};


const getBookingById = async (req, res, next) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);

    if (!booking) {
      return next(new AppError("Booking not found", 404));
    }

    if (
      req.user.role === "User" &&
      booking.user._id.toString() !== req.user._id.toString()
    ) {
      return next(new AppError("You can only view your own booking", 403));
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};


const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};


const updateBooking = async (req, res, next) => {
  try {
    const { seats } = req.body;

    const booking = await bookingService.updateBooking(
      req.params.id,
      req.user._id,
      req.user.role,
      seats
    );

    res.status(200).json({
      success: true,
      message: "Booking updated successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBooking(
      req.params.id,
      req.user._id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};


const deleteBooking = async (req, res, next) => {
  try {
    await bookingService.deleteBooking(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
  updateBooking,
  cancelBooking,
  deleteBooking,
};