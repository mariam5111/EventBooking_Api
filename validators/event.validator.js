const Joi = require("joi");
const AppError = require("../utils/appError");

const createEventSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.empty": "Title is required",
  }),
  details: Joi.string().trim().required().messages({
    "string.empty": "Details are required",
  }),
  date: Joi.date().greater("now").required().messages({
    "date.base": "Please provide a valid date",
    "date.greater": "Event date must be in the future",
  }),
  totalSeats: Joi.number().integer().min(1).required().messages({
    "number.base": "Total seats must be a number",
    "number.min": "Total seats must be at least 1",
  }),
});

const updateEventSchema = Joi.object({
  title: Joi.string().trim(),
  details: Joi.string().trim(),
  date: Joi.date().greater("now").messages({
    "date.greater": "Event date must be in the future",
  }),
  totalSeats: Joi.number().integer().min(1).messages({
    "number.base": "Total seats must be a number",
    "number.min": "Total seats must be at least 1",
  }),
}).min(1);

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    return next(new AppError(errorMessage, 400));
  }
  next();
};

module.exports = {
  createEventValidation: validate(createEventSchema),
  updateEventValidation: validate(updateEventSchema),
};