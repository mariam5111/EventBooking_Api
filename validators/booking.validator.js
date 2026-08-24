const Joi = require("joi");
const AppError = require("../utils/appError");
const validate = require("../middleware/validate");


const createBookingSchema = Joi.object({
  eventId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.empty": "Event ID is required",
      "string.hex": "Invalid Event ID format",
      "string.length": "Invalid Event ID length",
      "any.required": "Event ID is required",
    }),
  seats: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Seats must be a number",
      "number.integer": "Seats must be an integer",
      "number.min": "Seats must be at least 1",
      "any.required": "Number of seats is required",
    }),
});

const updateBookingSchema = Joi.object({
  seats: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Seats must be a number",
      "number.integer": "Seats must be an integer",
      "number.min": "Seats must be at least 1",
      "any.required": "Seats is required",
    }),
});



module.exports = {
  createBookingValidator: validate(createBookingSchema),
  updateBookingValidator: validate(updateBookingSchema),
};