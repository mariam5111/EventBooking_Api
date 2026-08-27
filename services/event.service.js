const Event = require('../models/event.model');
const AppError = require('../utils/appError');

const createEvent = async (eventData, userId, files) => {
  if (!files || files.length === 0) {
    throw new AppError('At least one image is required for the event', 400);
  }

  const { title, details, date, totalSeats } = eventData;


  const imageUrls = files ? files.map(file => `/uploads/${file.filename}`) : [];
  const coverImage = imageUrls.length > 0 ? imageUrls[0] : null;

  const event = await Event.create({
    title,
    details,
    date,
    totalSeats,
    availableSeats: totalSeats,
    createdBy: userId,
    coverImage,
    images: imageUrls,
  });

  return event;
};

const getAllEvents = async (filters = {}) => {
  const { search, fromDate, toDate, page = 1, limit = 10 } = filters;

  
  const query = {};

  
  if (search) {
    query.$text = { $search: search };
  }

  
  if (fromDate || toDate) {
    query.date = {};
    if (fromDate) query.date.$gte = new Date(fromDate);
    if (toDate) query.date.$lte = new Date(toDate);
  }

  const skip = (page - 1) * limit;

 
  const events = await Event.find(query)
    .sort({ date: 1 })
    .skip(skip)
    .limit(limit);

  
  const total = await Event.countDocuments(query);

  return {
    results: events,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

const getEventById = async (eventId) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }
  
  return event;
};

const updateEvent = async (eventId, updateData, userId, userRole, files) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }
  if (userRole !== 'Admin' && event.createdBy.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to update this event', 403);
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
  if (files && files.length > 0) {
    const newImageUrls = files.map(file => `/uploads/${file.filename}`);
    event.images = [...event.images, ...newImageUrls];
    if (!event.coverImage) {
      event.coverImage = newImageUrls[0];
    }
  }

  await event.save();
  return event;
};

const deleteEvent = async (eventId, userId, userRole) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  if (userRole !== 'Admin' && event.createdBy.toString() !== userId.toString()) {
    throw new AppError('You are not authorized to delete this event', 403);
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