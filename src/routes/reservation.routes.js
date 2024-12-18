const express = require('express');
const reservationController = require('../controllers/reservation.controller');
const validate = require('../middlewares/validation.middleware');
const { isAdmin, isPlayer, authenticateToken } = require('../middlewares/auth.middleware');
const reservationValidation = require('../validations/reservation.validation');

const router = express.Router();

// Create a reservation (Player Only)
router.post(
  '/',
  isPlayer,
  validate(reservationValidation.createReservation),
  reservationController.createReservation
);

// Get all reservations (Admin and Player Specific Views)
router.get(
  '/',
  authenticateToken,
  validate(reservationValidation.getAllReservations),
  reservationController.getAllReservations
);

// Update a reservation (Admin Only)
router.put(
  '/:id',
  isAdmin,
  validate(reservationValidation.updateReservation),
  reservationController.updateReservation
);

// Delete a reservation (Player Only)
router.delete(
  '/:id',
  isPlayer,
  validate(reservationValidation.deleteReservation),
  reservationController.deleteReservation
);

module.exports = router;
