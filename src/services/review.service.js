const prisma = require("../prisma/prisma");

class ReviewService {
  // Add a new review
  async addReview(data) {
    const { reviewerId, playerId, rating, comment } = data;

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    try {
      // Check if the reviewer and player are in the same team
      const teamMember = await prisma.teamMember.findFirst({
        where: {
          teamId: { in: await this.getTeamsByPlayer(reviewerId) },
          memberId: playerId,
        },
      });

      if (!teamMember) {
        throw new Error("Reviewer and player are not in the same team");
      }

      // Create the review
      const review = await prisma.review.create({
        data: { reviewerId, playerId, rating, comment },
      });

      // Update player's stats
      if(rating < 3) {
        await this.updatePlayerStats(playerId, rating, true);
      } else {
        await this.updatePlayerStats(playerId, rating, false);
      }

      

      return review;
    } catch (error) {
      throw new Error(error.message || "Failed to add review");
    }
  }

  // Update an existing review
  async updateReview(id, data) {
    const { rating } = data;

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    try {
      // Get the existing review
      const existingReview = await prisma.review.findUnique({
        where: { id },
      });

      if (!existingReview) throw new Error("Review not found");

      // Reverse the old rating effects
      await this.updatePlayerStats(existingReview.playerId, -existingReview.rating, true);

      // Update the review
      const updatedReview = await prisma.review.update({
        where: { id },
        data,
      });

      // Apply the new rating effects
      await this.updatePlayerStats(existingReview.playerId, rating);

      return updatedReview;
    } catch (error) {
      throw new Error(error.message || "Failed to update review");
    }
  }

  // Delete a review
  async deleteReview(id) {
    try {
      // Get the review to be deleted
      const review = await prisma.review.findUnique({
        where: { id },
      });

      if (!review) throw new Error("Review not found");

      // Reverse the rating effects
      await this.updatePlayerStats(review.playerId, -review.rating, true);

      // Delete the review
      await prisma.review.delete({ where: { id } });

      return { message: "Review deleted successfully" };
    } catch (error) {
      throw new Error(error.message || "Failed to delete review");
    }
  }

  // Get all reviews for a player
  async getAllReviews(playerId) {
    try {
      const reviews = await prisma.review.findMany({
        where: { playerId },
        include: {
          reviewer: { select: { id: true, name: true, email: true } },
        },
      });
      return reviews;
    } catch (error) {
      throw new Error("Failed to retrieve reviews");
    }
  }

  // Helper: Get teams by player
  async getTeamsByPlayer(playerId) {
    const teams = await prisma.teamMember.findMany({
      where: { memberId: playerId },
      select: { teamId: true },
    });
    return teams.map((team) => team.teamId);
  }

  // Helper: Update player's stats
  async updatePlayerStats(playerId, rating, isReversal) {
    const player = await prisma.user.findUnique({ where: { id: playerId } });

    if (!player) throw new Error("Player not found");

    const newReviewCount = isReversal
      ? player.reviewCount - 1
      : player.reviewCount + 1;
    const newTotalRating = isReversal
      ? player.averageRating * player.reviewCount - rating
      : player.averageRating * player.reviewCount + rating;
    const newAverageRating = newReviewCount === 0 ? 0 : newTotalRating / newReviewCount;

    // Update player's elo points
    const newEloPoints = isReversal ? player.eloPoints - (rating * 100) : player.eloPoints + (rating * 100);

    // Determine the new ELO level
    let newEloLevel = "BRONZE";
    if (newEloPoints >= 1000) newEloLevel = "SILVER";
    if (newEloPoints >= 2000) newEloLevel = "GOLD";
    if (newEloPoints >= 3000) newEloLevel = "PLATINUM";
    if (newEloPoints >= 4000) newEloLevel = "DIAMOND";
    if (newEloPoints >= 5000) newEloLevel = "LEGENDARY";

    await prisma.user.update({
      where: { id: playerId },
      data: {
        reviewCount: newReviewCount,
        averageRating: newAverageRating,
        eloPoints: newEloPoints,
        eloLevel: newEloLevel,
      },
    });
  }
}

module.exports = new ReviewService();
