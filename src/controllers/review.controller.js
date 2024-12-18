const reviewService = require("../services/review.service");

const addReview = async (req, res) => {
  try {
    const review = await reviewService.addReview(req.body);
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateReview = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedReview = await reviewService.updateReview(id, req.body);
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewService.deleteReview(id);
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAllReviews = async (req, res) => {
  const { playerId } = req.params;
  try {
    const reviews = await reviewService.getAllReviews(playerId);
    res.status(200).json({
      success: true,
      message: "Reviews retrieved successfully",
      data: reviews,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = {
  addReview,
  updateReview,
  deleteReview,
  getAllReviews,
};
