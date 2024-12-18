const express = require('express');
const { authenticateToken, isAdmin } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validation.middleware');
const { createStadiumSchema, updateStadiumSchema } = require('../validations/stadium.validation');
const stadiumController = require('../controllers/stadium.controller');

const stadiumRouter = express.Router();

stadiumRouter.post(
  '/',
  authenticateToken,
  isAdmin,
  validate(createStadiumSchema),
  stadiumController.createStadium
);

stadiumRouter.get('/', stadiumController.getAllStadiums);

stadiumRouter.get('/:id', stadiumController.getStadiumById);

stadiumRouter.put(
  '/:id',
  authenticateToken,
  isAdmin,
  validate(updateStadiumSchema),
  stadiumController.updateStadium
);

stadiumRouter.delete('/:id', authenticateToken, isAdmin, stadiumController.deleteStadium);

module.exports = stadiumRouter;
