const Joi = require("joi");

// Validation schema for creating a user
const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least {#limit} characters",
    "string.max": "Name cannot exceed {#limit} characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least {#limit} characters",
    "any.required": "Password is required",
  }),
});

// Validation schema for updating a user
const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50).messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least {#limit} characters",
    "string.max": "Name cannot exceed {#limit} characters",
  }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).messages({
    "string.min": "Password must be at least {#limit} characters",
  }),
}).min(1).messages({
  "object.min": "At least one field must be updated",
});

module.exports = {
  createUserSchema,
  updateUserSchema,
};
