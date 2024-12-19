const express = require("express");
const tournamentRouter = express.Router();
const tournamentController = require("../controllers/tournament.controller");

tournamentRouter.post("/", tournamentController.addTournament);
tournamentRouter.get("/", tournamentController.getAllTournaments);
tournamentRouter.get("/:id", tournamentController.getTournamentById);
tournamentRouter.put("/:id", tournamentController.updateTournament);
tournamentRouter.delete("/:id", tournamentController.removeTournament);

module.exports = tournamentRouter;
