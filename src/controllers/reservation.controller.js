const reservationService = require('../services/reservation.service');

const createReservation = async (req, res) => {
  try {
    const { startTime, endTime, stadiumId } = req.body;
    const { playerId } = req;
    console.log(playerId);
    const reservation = await reservationService.createReservation({
      stadiumId,
      playerId,
      startTime,
      endTime,
    });
    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const { stadiumId } = req.query;
    const { role, playerId, stadiumOwnerId } = req;
    const reservations = await reservationService.getAllReservations(
      role,
      playerId,
      stadiumOwnerId,
      stadiumId
    );
    res.status(200).json({
      success: true,
      message: 'Reservations retrieved successfully',
      reservations,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { stadiumOwnerId } = req;
    const reservation = await reservationService.updateReservation(id, status, stadiumOwnerId);
    res.status(200).json({
      success: true,
      message: 'Reservation updated successfully',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const { playerId } = req;
    await reservationService.deleteReservation(id, playerId);
    res.status(200).json({
      success: true,
      message: 'Reservation deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  updateReservation,
  deleteReservation,
};
