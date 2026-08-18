const bookingService = require("../services/booking.service");

const createBooking = async (req, res) => {
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
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getMyBookings(
      req.user._id
    );

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (
      req.user.role === "User" &&
      booking.user._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own booking",
      });
    }

    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBooking = async (req, res) => {
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
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await bookingService.cancelBooking(
      req.params.id,
      req.user._id,
      req.user.role
    );

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    await bookingService.deleteBooking(req.params.id);

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
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