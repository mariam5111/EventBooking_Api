const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an event title'],
      trim: true,
    },
    details: {
      type: String,
      required: [true, 'Please provide event details'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide an event date'],
    },
    totalSeats: {
      type: Number,
      required: [true, 'Please provide the total number of seats'],
      min: [1, 'Total seats must be at least 1'],
    },
    availableSeats: {
      type: Number,
      min: [0, 'Available seats cannot be negative'],
    },
    coverImage: {
      type: String,
      default: null,
    },
    images: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Event must belong to an organizer'],
    },
  },
  {
    timestamps: true,
  }
);

eventSchema.index({ date: 1 });
eventSchema.index({ title: 'text', details: 'text' });

eventSchema.pre('validate', function () {
  if (this.isNew && this.availableSeats === undefined) {
    this.availableSeats = this.totalSeats;
  }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
