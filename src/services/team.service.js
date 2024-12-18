// services/team.service.js

const prisma = require('../prisma/prisma');

class TeamService {
  // Create a team
  async createTeam(data) {
    try {
      const team = await prisma.team.create({
        data,
      });
      return team;
    } catch (error) {
        console.error(error);
      throw new Error('Failed to create team');
    }
  }

  // Get all teams (optionally filtered by tournamentId)
  async getAllTeams(tournamentId) {
    try {
      const teams = await prisma.team.findMany({
        where: {
          tournamentId: tournamentId || undefined, // Optional filter for tournament
        },
        include: {
          captain: true, // Include captain details
          members: {
            select: {
              user: true, // Include user details for members
            },
          },
          tournament: true, // Include tournament details
        },
      });
      return teams;
    } catch (error) {
        console.error(error);
      throw new Error('Failed to retrieve teams');
    }
  }

  // Get a single team by ID
  async getTeamById(id) {
    try {
      const team = await prisma.team.findUnique({
        where: {
          id,
        },
        include: {
          captain: true,
          members: true,
          tournament: true,
          matchesAsTeamA: true,
          matchesAsTeamB: true,
        },
      });
      if (!team) throw new Error('Team not found');
      return team;
    } catch (error) {
      throw new Error(error.message || 'Failed to retrieve team');
    }
  }

  // Update a team
  async updateTeam(id, data) {
    try {
      const team = await prisma.team.update({
        where: {
          id,
        },
        data,
      });
      return team;
    } catch (error) {
      throw new Error('Failed to update team');
    }
  }

  // Delete a team
  async deleteTeam(id) {
    try {
      const team = await prisma.team.delete({
        where: {
          id,
        },
      });
      return team;
    } catch (error) {
      throw new Error('Failed to delete team');
    }
  }
}

module.exports = new TeamService();
