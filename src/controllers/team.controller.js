// controllers/team.controller.js

const teamService = require('../services/team.service');

const createTeam = async (req, res) => {
  try {
    const { name, captainId, tournamentId } = req.body;
    const data = {
      name,
      captainId,
      tournamentId,
    };
    const team = await teamService.createTeam(data);
    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      team,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const { tournamentId } = req.query;  // Optional query param for filtering by tournament
    const teams = await teamService.getAllTeams(tournamentId);
    res.status(200).json({
      success: true,
      message: 'Teams retrieved successfully',
      teams,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await teamService.getTeamById(id);
    res.status(200).json({
      success: true,
      message: 'Team retrieved successfully',
      team,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, captainId, tournamentId } = req.body;
    const data = {
      name,
      captainId,
      tournamentId,
    };
    const updatedTeam = await teamService.updateTeam(id, data);
    res.status(200).json({
      success: true,
      message: 'Team updated successfully',
      updatedTeam,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    await teamService.deleteTeam(id);
    res.status(200).json({
      success: true,
      message: 'Team deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
