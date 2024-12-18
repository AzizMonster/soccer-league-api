const stadiumService = require('../services/stadium.service');

const createStadium = async (req, res) => {
  try {
    const { name, location, capacity , pricePerHour , imagePath} = req.body;
    const { userId: ownerId } = req.user; // Stadium owner ID from the token
    const stadium = await stadiumService.createStadium({ name, location, capacity, pricePerHour, imagePath, ownerId });
    res.status(201).json({
      success: true,
      message: 'Stadium created successfully',
      stadium,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllStadiums = async (req, res) => {
  try {
    const stadiums = await stadiumService.getAllStadiums();
    res.status(200).json({
      success: true,
      message: 'Stadiums retrieved successfully',
      stadiums,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStadiumById = async (req, res) => {
  try {
    const { id } = req.params;
    const stadium = await stadiumService.getStadiumById(id);
    if (!stadium) {
      return res.status(404).json({ success: false, message: 'Stadium not found' });
    }
    res.status(200).json({
      success: true,
      message: 'Stadium retrieved successfully',
      stadium,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateStadium = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location } = req.body;
    const stadium = await stadiumService.updateStadium(id, { name, location });
    res.status(200).json({
      success: true,
      message: 'Stadium updated successfully',
      stadium,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteStadium = async (req, res) => {
  try {
    const { id } = req.params;
    await stadiumService.deleteStadium(id);
    res.status(200).json({
      success: true,
      message: 'Stadium deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createStadium,
  getAllStadiums,
  getStadiumById,
  updateStadium,
  deleteStadium,
};
