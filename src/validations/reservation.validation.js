const Joi = require('joi');

const createReservation = Joi.object({
  stadiumId: Joi.string().uuid().required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().greater(Joi.ref('startTime')).required(),
});

const getAllReservations = Joi.object({
  stadiumId: Joi.string().uuid().optional(),
});

const updateReservation = Joi.object({
  status: Joi.string().valid('PENDING', 'CONFIRMED', 'CANCELED').required(),
});

const deleteReservation = Joi.object({
  id: Joi.string().uuid().required(),
});

module.exports = {
  createReservation,
  getAllReservations,
  updateReservation,
  deleteReservation,
};
