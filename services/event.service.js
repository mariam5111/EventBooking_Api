const Event = require("../models/event.model");
const AppError = require("../utils/appError");

const createEvent = async (eventData, userId) => {
  const { title, details, date, totalSeats } = eventData;

  const event = await Event.create({
    title,
    details,
    date,
    totalSeats,
    availableSeats: totalSeats,
    createdBy: userId,
  });

  return event;
};

const getAllEvents = async () => {
  const events = await Event.find().sort({ date: 1 });
  return events;
};

const getEventById = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404);
  }
  return event;
};

const updateEvent = async (eventId, updateData) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404);
  }

  const { title, details, date, totalSeats } = updateData;

  if (title !== undefined) event.title = title;
  if (details !== undefined) event.details = details;
  if (date !== undefined) event.date = date;

  if (totalSeats !== undefined) {
    const seatsTaken = event.totalSeats - event.availableSeats;

    if (totalSeats < seatsTaken) {
      throw new AppError(
        `Total seats cannot be less than the ${seatsTaken} seat(s) already booked`,
        400
      );
    }

    event.availableSeats = totalSeats - seatsTaken;
    event.totalSeats = totalSeats;
  }

  await event.save();
  return event;
};

const deleteEvent = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError("Event not found", 404);
  }

  await event.deleteOne();
  return event;
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};