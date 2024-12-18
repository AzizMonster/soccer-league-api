const tournamentService = require("../services/tournament.service");

const addTournament = async (req, res) => {
    try {
        const { name, description, stadiumId, ownerId, startDate, endDate, status, prizePool } = req.body;

        const tournament = await tournamentService.addTournament({
            name,
            description,
            stadiumId,
            matchId,
            ownerId,
            startDate,
            endDate,
            status,
            prizePool,
        });

        res.status(201).json({
            success: true,
            message: "Tournament added successfully",
            tournament,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const getAllTournaments = async (req, res) => {
    try {
        const tournaments = await tournamentService.getAllTournaments();
        res.status(200).json({
            success: true,
            message: "Tournaments retrieved successfully",
            tournaments,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTournamentById = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await tournamentService.getTournamentById(id);
        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }
        res.status(200).json({
            success: true,
            message: "Tournament retrieved successfully",
            tournament,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, stadiumId, ownerId, startDate, endDate, status, prizePool } = req.body;

        const updatedTournament = await tournamentService.updateTournament(id, {
            name,
            description,
            stadiumId,
            ownerId,
            startDate,
            endDate,
            status,
            prizePool,
        });

        if (!updatedTournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }

        res.status(200).json({
            success: true,
            message: "Tournament updated successfully",
            updatedTournament,
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

const removeTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const tournament = await tournamentService.removeTournament(id);
        if (!tournament) {
            return res.status(404).json({ success: false, message: "Tournament not found" });
        }
        res.status(200).json({
            success: true,
            message: "Tournament removed successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    addTournament,
    getAllTournaments,
    getTournamentById,
    updateTournament,
    removeTournament,
};
