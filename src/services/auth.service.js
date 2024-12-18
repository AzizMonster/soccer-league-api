const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { JWT_SECRET } = process.env;

// Helper function to generate JWT token
const generateToken = async (user) => {
  const token = await jwt.sign(
    { userId: user.id, role: user.role }, // Payload
    JWT_SECRET,                        // Secret key
    { expiresIn: '1h' }                   // Token expiration time
  );
  return token;
};

// Service method for registering a new user
const registerUser = async (name, email, password, role) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('User already exists');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create new user in the database
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'PLAYER', // Default role to 'PLAYER'
      },
    });
    console.log(newUser);
    // Generate JWT token for the new user
    const token = await generateToken(newUser);
    console.log(token);
    return { newUser, token };
  } catch (error) {
    throw new Error('Failed to create user');
  }
};

// Service method for logging in a user
const loginUser = async (email, password) => {
  // Find user by email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  // Compare the password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  // Generate JWT token
  const token = await generateToken(user);
  console.log(token);
  return { user, token };
};

module.exports = { registerUser, loginUser };
