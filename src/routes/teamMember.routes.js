const express = require("express");
const teamMemberController = require("../controllers/teamMember.controller");
const teamMemberRouter = express.Router();

// Add a new team member
teamMemberRouter.post("/", teamMemberController.addTeamMember);

// Get all members of a specific team
teamMemberRouter.get("/:teamId", teamMemberController.getAllTeamMembers);

// Get a specific team member by ID
teamMemberRouter.get("/member/:id", teamMemberController.getTeamMemberById);

// Remove a team member
teamMemberRouter.delete("/:id", teamMemberController.removeTeamMember);

module.exports = teamMemberRouter;
