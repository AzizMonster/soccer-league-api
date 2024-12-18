const teamMemberService = require("../services/teamMember.service");

const addTeamMember = async (req, res) => {
    try {
      const { teamId, memberId } = req.body;
      const teamMember = await teamMemberService.addTeamMember({ teamId, memberId });
      res.status(201).json({
        success: true,
        message: "Team member added successfully",
        teamMember,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message }); // Return 400 for validation error
    }
  };

const getAllTeamMembers = async (req, res) => {
  try {
    const { teamId } = req.params;
    const members = await teamMemberService.getAllTeamMembers(teamId);
    res.status(200).json({
      success: true,
      message: "Team members retrieved successfully",
      members,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await teamMemberService.getTeamMemberById(id);
    res.status(200).json({
      success: true,
      message: "Team member retrieved successfully",
      teamMember,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const removeTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    await teamMemberService.removeTeamMember(id);
    res.status(200).json({
      success: true,
      message: "Team member removed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  removeTeamMember,
};
