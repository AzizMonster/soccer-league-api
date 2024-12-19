const authService = require('../services/auth.service');

// Controller method for user registration
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const { newUser, token } = await authService.registerUser(name, email, password, role);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Controller method for user login
const loginUser = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser };
