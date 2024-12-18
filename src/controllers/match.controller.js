const matchService = require("../services/match.service");

const createMatch = async (req, res) => {
  try {
    const { reservationId, teamAId, teamBId } = req.body;
    const match = await matchService.createMatch(reservationId, teamAId, teamBId);

    res.status(201).json({
      success: true,
      message: "Match created successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllMatches = async (req, res) => {
  try {
    const matches = await matchService.getAllMatches();

    res.status(200).json({
      success: true,
      message: "Matches retrieved successfully",
      matches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await matchService.getMatchById(id);

    res.status(200).json({
      success: true,
      message: "Match retrieved successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { scoreTeamA, scoreTeamB } = req.body;

    const match = await matchService.updateMatch(id, scoreTeamA, scoreTeamB);

    res.status(200).json({
      success: true,
      message: "Match updated successfully",
      match,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    await matchService.deleteMatch(id);

    res.status(200).json({
      success: true,
      message: "Match deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createMatch,
  getAllMatches,
  getMatchById,
  updateMatch,
  deleteMatch,
};
