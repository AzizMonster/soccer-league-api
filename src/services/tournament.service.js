const prisma = require("../prisma/prisma");

class TournamentService {
    // Add a new tournament
    async addTournament(data) {
        try {
            // Ensure the start date is before the end date
            if (new Date(data.startDate) >= new Date(data.endDate)) {
                throw new Error("Start date must be before end date");
            }

            // Create the tournament
            const tournament = await prisma.tournament.create({
                data,
            });

            return tournament;
        } catch (error) {
            throw new Error(error.message || "Failed to add tournament");
        }
    }

    // Get all tournaments
    async getAllTournaments() {
        try {
            const tournaments = await prisma.tournament.findMany({
                include: {
                    stadium: true,
                    teams: true,
                },
            });
            return tournaments;
        } catch (error) {
            throw new Error("Failed to retrieve tournaments");
        }
    }

    // Get a specific tournament by ID
    async getTournamentById(id) {
        try {
            const tournament = await prisma.tournament.findUnique({
                where: { id },
                include: {
                    stadium: true,
                    teams: true,
                },
            });
            if (!tournament) throw new Error("Tournament not found");
            return tournament;
        } catch (error) {
            throw new Error(error.message || "Failed to retrieve tournament");
        }
    }

    // Update tournament details
    async updateTournament(id, data) {
        try {
            // Ensure the tournament exists
            const existingTournament = await prisma.tournament.findUnique({
                where: { id },
            });
            if (!existingTournament) throw new Error("Tournament not found");

            // Ensure the start date is before the end date
            if (new Date(data.startDate) >= new Date(data.endDate)) {
                throw new Error("Start date must be before end date");
            }

            // Update the tournament
            const updatedTournament = await prisma.tournament.update({
                where: { id },
                data: {
                    name: data.name,
                    description: data.description,
                    stadiumId: data.stadiumId,
                    ownerId: data.ownerId,
                    startDate: new Date(data.startDate),
                    endDate: new Date(data.endDate),
                    status: data.status,
                    prizePool: data.prizePool,
                },
            });

            return updatedTournament;
        } catch (error) {
            throw new Error(error.message || "Failed to update tournament");
        }
    }

    // Remove a tournament
    async removeTournament(id) {
        try {
            const tournament = await prisma.tournament.delete({
                where: { id },
            });
            return tournament;
        } catch (error) {
            throw new Error("Failed to remove tournament");
        }
    }
}

module.exports = new TournamentService();
