const Joi = require('joi');

const createStadiumSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  location: Joi.string().min(3).max(100).required(),
  capacity: Joi.number().required(),
  imagePath: Joi.string().optional(),
  pricePerHour: Joi.number().required(),
});

const updateStadiumSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  location: Joi.string().min(3).max(100).optional(),
});

module.exports = { createStadiumSchema, updateStadiumSchema };
