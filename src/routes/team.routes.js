// routes/team.routes.js

const express = require('express');
const teamRouter = express.Router();
const teamController = require('../controllers/team.controller');

// Route to create a new team
teamRouter.post('/', teamController.createTeam);

// Route to get all teams (with optional tournament filtering)
teamRouter.get('/', teamController.getAllTeams);

// Route to get a single team by ID
teamRouter.get('/:id', teamController.getTeamById);

// Route to update a team
teamRouter.put('/:id', teamController.updateTeam);

// Route to delete a team
teamRouter.delete('/:id', teamController.deleteTeam);

module.exports = teamRouter;
