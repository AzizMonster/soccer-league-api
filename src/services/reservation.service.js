const prisma = require("../prisma/prisma");

class ReservationService {
  async createReservation(data) {
    return await prisma.reservation.create({
      data,
    });
  }

  async getAllReservations(role, playerId, stadiumOwnerId, stadiumId) {
    if (role === 'ADMIN') {
      return await this.getReservationsForAdmin(stadiumOwnerId);
    } else if (role === 'PLAYER' && stadiumId) {
      return await this.getReservationsForPlayer(stadiumId);
    }
    throw new Error('Unauthorized access or invalid query');
  }

  async getReservationsForAdmin(stadiumOwnerId) {
    // Retrieve all reservations for stadiums managed by the admin
    return await prisma.reservation.findMany({
      where: {
        stadium: {
          ownerId: stadiumOwnerId, // Ensure the admin is the owner
        },
      },
      include: {
        user: {
          select: { id: true, name: true, email: true }, // Include player details
        },
        stadium: {
          select: { id: true, name: true }, // Include stadium details
        },
      },
    });
  }

  async getReservationsForPlayer(stadiumId) {
    // Retrieve limited reservation info for a specific stadium
    return await prisma.reservation.findMany({
      where: { stadiumId },
      select: {
        id: true,
        startTime: true,
        endTime: true,
        status: true, // Limit the fields to only these
      },
    });
  }

  async updateReservation(id, status, stadiumOwnerId) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { stadium: true },
    });
    if (!reservation || reservation.stadium.ownerId !== stadiumOwnerId) {
      throw new Error('Reservation not found or access denied');
    }
    return await prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }

  async deleteReservation(id, playerId) {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
    });
    if (!reservation || reservation.playerId !== playerId) {
      throw new Error('Reservation not found or access denied');
    }
    return await prisma.reservation.delete({ where: { id } });
  }
}

module.exports = new ReservationService();
