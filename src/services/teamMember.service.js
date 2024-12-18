const prisma = require("../prisma/prisma");

class TeamMemberService {
  // Add a new team member
  async addTeamMember(data) {
    try {
      // Check current number of members in the team
      const teamMemberCount = await prisma.teamMember.count({
        where: { teamId: data.teamId },
      });

      if (teamMemberCount >= 6) {
        throw new Error("Team cannot have more than 6 members");
      }

      const teamMember = await prisma.teamMember.create({ data });
      return teamMember;
    } catch (error) {
      throw new Error(error.message || "Failed to add team member");
    }
  }

  // Get all members of a specific team
  async getAllTeamMembers(teamId) {
    try {
      const members = await prisma.teamMember.findMany({
        where: { teamId },
        include: {
          team: true,
          member: { select: { id: true, name: true, email: true } },
        },
      });
      return members;
    } catch (error) {
      throw new Error("Failed to retrieve team members");
    }
  }

  // Get a specific team member by ID
  async getTeamMemberById(id) {
    try {
      const teamMember = await prisma.teamMember.findUnique({
        where: { id },
        include: {
          team: true,
          member: { select: { id: true, name: true, email: true } },
        },
      });
      if (!teamMember) throw new Error("Team member not found");
      return teamMember;
    } catch (error) {
      throw new Error(error.message || "Failed to retrieve team member");
    }
  }

  // Remove a team member
  async removeTeamMember(id) {
    try {
      const teamMember = await prisma.teamMember.delete({
        where: { id },
      });
      return teamMember;
    } catch (error) {
      throw new Error("Failed to remove team member");
    }
  }
}

module.exports = new TeamMemberService();
