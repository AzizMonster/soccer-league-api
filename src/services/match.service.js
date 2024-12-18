const prisma = require("../prisma/prisma");

class MatchService {
  async createMatch(reservationId, teamAId, teamBId) {
    const reservation = await prisma.reservation.findUnique({
      where: { id: reservationId },
    });
    if (!reservation) {
      throw new Error("Reservation not found");
    }

    const match = await prisma.match.create({
      data: {
        teamAId,
        teamBId,
        stadiumId: reservation.stadiumId,
        matchDate: reservation.startTime,  // Match date is the same as the startTime of the reservation
        scoreTeamA: 0,
        scoreTeamB: 0,
      },
    });
    return match;
  }

  async getAllMatches() {
    return await prisma.match.findMany({
      include: {
        teamA: true,
        teamB: true,
        stadium: true,
      },
    });
  }

  async getMatchById(id) {
    return await prisma.match.findUnique({
      where: { id },
      include: {
        teamA: true,
        teamB: true,
        stadium: true,
      },
    });
  }

  async updateMatch(id, scoreTeamA, scoreTeamB) {
    const match = await prisma.match.findUnique({
      where: { id },
    });
    if (!match) {
      throw new Error('Match not found');
    }

    return await prisma.match.update({
      where: { id },
      data: { scoreTeamA, scoreTeamB },
    });
  }

  async deleteMatch(id) {
    const match = await prisma.match.findUnique({
      where: { id },
    });
    if (!match) {
      throw new Error('Match not found');
    }

    return await prisma.match.delete({
      where: { id },
    });
  }
}

module.exports = new MatchService();
