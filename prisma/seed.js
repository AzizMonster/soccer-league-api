const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

// Seed users
async function seedUsers() {
  const users = [
    { name: 'John Doe', email: 'john.doe@example.com', role: 'PLAYER' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', role: 'PLAYER' },
    { name: 'Michael Johnson', email: 'michael.johnson@example.com', role: 'PLAYER' },
    { name: 'Emily Davis', email: 'emily.davis@example.com', role: 'PLAYER' },
    { name: 'Chris Brown', email: 'chris.brown@example.com', role: 'PLAYER' },
    { name: 'Amanda Wilson', email: 'amanda.wilson@example.com', role: 'PLAYER' },
    { name: 'David Martinez', email: 'david.martinez@example.com', role: 'PLAYER' },
    { name: 'Sarah Taylor', email: 'sarah.taylor@example.com', role: 'PLAYER' },
    { name: 'Robert Anderson', email: 'robert.anderson@example.com', role: 'PLAYER' },
    { name: 'Laura Thomas', email: 'laura.thomas@example.com', role: 'PLAYER' },
    { name: 'Kevin White', email: 'kevin.white@example.com', role: 'PLAYER' },
    { name: 'Emma Harris', email: 'emma.harris@example.com', role: 'PLAYER' },
    { name: 'Admin User', email: 'admin.user@example.com', role: 'ADMIN' },
  ];

  // Loop through the users array to create each user in the database
  for (let i = 0; i < users.length; i++) {
    const user = users[i];

    // Hash the password
    const hashedPassword = await bcrypt.hash('password123', 10);  // 10 is the salt rounds

    try {
      // Create user in the database
      await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: hashedPassword,  // Store the hashed password
          role: user.role,
        },
      });
      console.log(`User ${user.name} created successfully`);
    } catch (error) {
      console.error(`Error creating user ${user.name}:`, error);
    }
  }
}

// Run the seeder
async function main() {
  await seedUsers();
  await prisma.$disconnect();
}

// Execute the seeding process
main()
  .then(() => console.log('Seeding completed'))
  .catch((e) => {
    console.error('Error during seeding:', e);
    prisma.$disconnect();
  });
