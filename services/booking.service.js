const Booking = require("../models/booking.model");
const Event = require("../models/event.model");


const createBooking = async (userId, eventId, seats) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.availableSeats < seats) {
    throw new Error("Not enough available seats");
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
  return await Booking.find({
    user: userId,
  })
    .populate("event")
    .populate("user", "name email role")
    .sort({ createdAt: -1 });
};

const getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId)
    .populate("event")
    .populate("user", "name email role");
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
    throw new Error("Booking not found");
  }

  if (
    role === "User" &&
    booking.user.toString() !== userId.toString()
  ) {
    throw new Error("You can only update your own booking");
  }

  if (booking.status === "cancelled") {
    throw new Error("Cancelled booking cannot be updated");
  }

  const event = await Event.findById(booking.event);

  if (!event) {
    throw new Error("Event not found");
  }

  const difference = newSeats - booking.seats;

  if (difference > 0) {
    if (event.availableSeats < difference) {
      throw new Error("Not enough available seats");
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
    throw new Error("Booking not found");
  }

  if (
    role === "User" &&
    booking.user.toString() !== userId.toString()
  ) {
    throw new Error("You can only cancel your own booking");
  }

  if (booking.status === "cancelled") {
    throw new Error("Booking is already cancelled");
  }

  const event = await Event.findById(booking.event);

  if (!event) {
    throw new Error("Event not found");
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
    throw new Error("Booking not found");
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