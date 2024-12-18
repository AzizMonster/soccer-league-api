const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// Create a user
exports.createUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
};

// Get all users
exports.getAllUsers = async () => {
  return await prisma.user.findMany();
};

// Get user by ID
exports.getUserById = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found.");
  return user;
};

// Update a user
exports.updateUser = async (id, updateData) => {
  const { password, ...rest } = updateData;

  // Hash password if being updated
  if (password) {
    rest.password = await bcrypt.hash(password, 10);
  }

  return await prisma.user.update({
    where: { id },
    data: rest,
  });
};

// Delete a user
exports.deleteUser = async (id) => {
  const existingUser = await prisma.user.findUnique({ where: { id } });
  if (!existingUser) throw new Error("User not found.");

  return await prisma.user.delete({ where: { id } });
};
