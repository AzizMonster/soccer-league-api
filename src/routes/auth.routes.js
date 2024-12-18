const express = require('express');
const authController = require('../controllers/auth.controller');
const authRouter = express.Router();

// Route for user registration
authRouter.post('/register', authController.registerUser);

// Route for user login
authRouter.post('/login', authController.loginUser);

module.exports = authRouter;
