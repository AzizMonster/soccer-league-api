const prisma = require('../prisma/prisma');

class StadiumService {
  async createStadium(data) {
    return await prisma.stadium.create({
      data,
    });
  }

  async getAllStadiums() {
    return await prisma.stadium.findMany({
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
      },
    });
  }

  async getStadiumById(id) {
    return await prisma.stadium.findUnique({
      where: { id: parseInt(id, 10) },
      include: {
        owner: {
          select: { id: true, name: true, email: true },
        },
        reservations: true,
      },
    });
  }

  async updateStadium(id, data) {
    return await prisma.stadium.update({
      where: { id: parseInt(id, 10) },
      data,
    });
  }

  async deleteStadium(id) {
    return await prisma.stadium.delete({
      where: { id: parseInt(id, 10) },
    });
  }
}

module.exports = new StadiumService();
