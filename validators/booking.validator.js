const mongoose = require("mongoose");

const createBookingValidator = (req, res, next) => {
  const { eventId, seats } = req.body;

  if (!eventId) {
    return res.status(400).json({
      success: false,
      message: "Event ID is required",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(eventId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Event ID",
    });
  }

  if (!seats) {
    return res.status(400).json({
      success: false,
      message: "Number of seats is required",
    });
  }

  if (!Number.isInteger(seats) || seats < 1) {
    return res.status(400).json({
      success: false,
      message: "Seats must be a positive integer",
    });
  }

  next();
};


const updateBookingValidator = (req, res, next) => {
  const { seats } = req.body;

  if (seats === undefined) {
    return res.status(400).json({
      success: false,
      message: "Seats is required",
    });
  }

  if (!Number.isInteger(seats) || seats < 1) {
    return res.status(400).json({
      success: false,
      message: "Seats must be a positive integer",
    });
  }

  next();
};


module.exports = {
  createBookingValidator,
  updateBookingValidator,
};