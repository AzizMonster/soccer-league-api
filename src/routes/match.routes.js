const express = require("express");
const matchRouter = express.Router();
const matchController = require("../controllers/match.controller");

matchRouter.post("/", matchController.createMatch);
matchRouter.get("/", matchController.getAllMatches);
matchRouter.get("/:id", matchController.getMatchById);
matchRouter.put("/:id", matchController.updateMatch);
matchRouter.delete("/:id", matchController.deleteMatch);

module.exports = matchRouter;
