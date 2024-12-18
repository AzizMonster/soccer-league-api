const express = require("express");
const router = express.Router();
const userRoutes = require("./user.routes");
const authRoutes = require("./auth.routes");
const reservationRoutes = require("./reservation.routes");
const stadiumRoutes = require("./stadium.routes");
const matchRoutes = require("./match.routes");
const teamRoutes = require("./team.routes");
const teamMembersRoutes = require("./teamMember.routes");
const reviewRoutes = require("./review.routes");
const touranmentRouter = require("./tournament.routes");

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/reservations", reservationRoutes);
router.use("/stadiums", stadiumRoutes);
router.use("/matches", matchRoutes);
router.use("/teams", teamRoutes);
router.use("/teamMembers", teamMembersRoutes);
router.use("/reviews", reviewRoutes);
router.use("/tournaments", touranmentRouter);

module.exports = router;