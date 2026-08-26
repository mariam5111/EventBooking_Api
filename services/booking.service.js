const Booking = require("../models/booking.model");
const Event = require("../models/event.model");
const AppError = require("../utils/appError");

const createBooking = async (userId, eventId, seats) => {
  
  const event = await Event.findOneAndUpdate(
    {
      _id: eventId,
      availableSeats: { $gte: seats }, 
    },
    {
      $inc: { availableSeats: -seats }, 
    },
    {
      new: true, 
      runValidators: true,
    }
  );

 
  if (!event) {
    const existingEvent = await Event.findById(eventId);
    if (!existingEvent) {
      throw new AppError("Event not found", 404);
    }
    if (existingEvent.availableSeats < seats) {
      throw new AppError("Not enough available seats", 400);
    }
  }


  try {
    const booking = await Booking.create({
      user: userId,
      event: eventId,
      seats,
      status: "confirmed",
    });
    return booking;
  } catch (error) {
  
    await Event.findByIdAndUpdate(eventId, {
      $inc: { availableSeats: seats },
    });
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

  const difference = newSeats - booking.seats;

 
  if (difference > 0) {
    const event = await Event.findOneAndUpdate(
      {
        _id: booking.event,
        availableSeats: { $gte: difference },
      },
      {
        $inc: { availableSeats: -difference },
      },
      { new: true, runValidators: true }
    );

    if (!event) {
      throw new AppError("Not enough available seats", 400);
    }
  } else if (difference < 0) {
 
    await Event.findByIdAndUpdate(booking.event, {
      $inc: { availableSeats: Math.abs(difference) },
    });
  }


  booking.seats = newSeats;
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

  
  const event = await Event.findByIdAndUpdate(
    booking.event,
    {
      $inc: { availableSeats: booking.seats },
    },
    { new: true, runValidators: true }
  );

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  
  booking.status = "cancelled";
  await booking.save();

  return booking;
};

const deleteBooking = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new AppError("Booking not found", 404);
  }


  if (booking.status === "confirmed") {
    await Event.findByIdAndUpdate(booking.event, {
      $inc: { availableSeats: booking.seats },
    });
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