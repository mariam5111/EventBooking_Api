const Booking = require("../models/booking.model");
const Event = require("../models/event.model");
const AppError = require("../utils/appError");

const createBooking = async (userId, eventId, seats) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.availableSeats < seats) {
    throw new AppError("Not enough available seats", 400);
  }

  event.availableSeats -= seats;
  await event.save();

  try {
    const booking = await Booking.create({
      user: userId,
      event: eventId,
      seats,
      status: "confirmed",
    });

    return booking;
  } catch (error) {

    event.availableSeats += seats;
    await event.save();

    throw error;
  }
};

const getMyBookings = async (userId) => {
  return await Booking.find({ user: userId })
    .populate("event")
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
};

const getBookingById = async (id) => {
  return await Booking.findById(id).populate("event");
};

const getAllBookings = async () => {
  return await Booking.find()
    .populate("event")
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
};

const updateBooking = async (bookingId, userId, role, newSeats) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  

  if (booking.status === "cancelled") {
    throw new AppError("Cancelled booking cannot be updated", 400);
  }

  const event = await Event.findById(booking.event);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  const difference = newSeats - booking.seats;

  if (difference > 0) {
    if (event.availableSeats < difference) {
      throw new AppError("Not enough available seats", 400);
    }

    event.availableSeats -= difference;
  }

  if (difference < 0) {
    event.availableSeats += Math.abs(difference);
  }

  booking.seats = newSeats;

  await event.save();
  await booking.save();

  return booking;
};

const cancelBooking = async (bookingId, userId, role) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }



  if (booking.status === "cancelled") {
    throw new AppError("Booking is already cancelled", 400);
  }

  const event = await Event.findById(booking.event);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  event.availableSeats += booking.seats;
  booking.status = "cancelled";

  await event.save();
  await booking.save();

  return booking;
};

const deleteBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError("Booking not found", 404);
  }

  const event = await Event.findById(booking.event);

  if (event && booking.status === "confirmed") {
    event.availableSeats += booking.seats;
    await event.save();
  }

  await Booking.findByIdAndDelete(bookingId);

  return booking;
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