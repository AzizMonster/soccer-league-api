const express = require("express");
const reviewController = require("../controllers/review.controller");

const reviewRouter = express.Router();

// Add a new review
reviewRouter.post("/", reviewController.addReview);

// Update an existing review
reviewRouter.put("/:id", reviewController.updateReview);

// Delete a review
reviewRouter.delete("/:id", reviewController.deleteReview);

// Get all reviews for a specific player
reviewRouter.get("/:playerId", reviewController.getAllReviews);

module.exports = reviewRouter;
