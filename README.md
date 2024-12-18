
# Football Stadium Reservation System

## Project Overview

The **Football Stadium Reservation System** is a web-based platform designed to manage stadium reservations, teams, tournaments, player ratings, and more. It allows players to reserve football stadiums for their matches, manage teams, and participate in tournaments. Players are able to leave reviews for teammates, and based on those reviews, their performance and rankings are tracked through Elo ratings.

### Key Features:
- **Team Management**: Players can be part of teams, and team captains can manage team rosters.
- **Review System**: Team members can review each other after a match. Reviews impact player statistics such as Elo ranking and average rating.
- **Elo Rating**: Based on player reviews, Elo points and levels (Bronze, Silver, Gold, etc.) are assigned to each player.
- **Tournament System**: Teams can participate in tournaments, where matches are played based on the tournament schedule.
- **Stadium Reservation**: Players can reserve football stadiums for their matches.
  
## Technologies Used

- **Backend**: 
  - **Node.js** (JavaScript runtime for server-side development)
  - **Express.js** (Web framework for Node.js)
  - **Prisma** (ORM to interact with the database)
  - **JWT** (JSON Web Tokens for authentication and authorization)
  - **TypeScript** (For type safety and better developer experience)
  
- **Database**:
  - **PostgreSQL** (Relational database for storing user data, reviews, teams, and reservations)

- **Authentication**: 
  - **JWT (JSON Web Token)** for user authentication and role-based authorization.

- **Security**: 
  - **Helmet.js** for security headers.
  - **CORS** for handling cross-origin requests.
  
- **Elo Rating System**: 
  - A rating system that calculates player rankings based on reviews, affecting both their Elo points and levels.
  
- **API Testing**:
  - **Postman** for testing and validating API endpoints.

## Project Structure

```bash
src/
├── controllers/        # Controllers for managing routes
├── routes/             # API routes for different resources
├── services/           # Business logic and interactions with the database
├── prisma/             # Prisma client and database schema
├── middelwares/        # Middelwares 
├── validations/        # Validation 
└── server.js           # Server entry point
```

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/AzizMonster/soccer-league-api.git
```

### 2. Install dependencies

Navigate to the project folder and install the required dependencies.

```bash
cd football-stadium-reservation-system
npm install
```

### 3. Set up the database

- Install PostgreSQL locally or use a cloud database service like **Heroku**, **ElephantSQL**, or **AWS RDS**.
- Create a `.env` file and add the necessary environment variables for the database connection.

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/football_stadium_db"
JWT_SECRET="your-jwt-secret"
PORT=3000
HOST = localhost
```

### 4. Run Prisma migrations and generate

Run Prisma migrations to set up your database schema.

```bash
npm run prisma:migrate --name init
```

```bash
npm run prisma:mgenerate
```

### 5. Run the application

```bash
npm run dev
```

The server will be running on `http://localhost:3000`.

### 6. Test API with Postman

You can import the Postman collection provided in the repository to test the CRUD operations for reviews, teams, and stadium reservations.

## API Documentation

### Authentication:
- **POST `/auth/register`**: Register a new user.
- **POST `/auth/login`**: Log in and get a JWT token.

### Team Member Management:
- **POST `/teams/:teamId/members`**: Add a new team member.
- **GET `/teams/:teamId/members`**: Get all members of a team.
- **DELETE `/teams/:teamId/members/:memberId`**: Remove a team member.

### Review Management:
- **POST `/reviews`**: Add a new review for a player.
- **PUT `/reviews/:reviewId`**: Update an existing review.
- **DELETE `/reviews/:reviewId`**: Delete a review.
- **GET `/reviews/player/:playerId`**: Get all reviews for a player.

### Elo Rating:
- **GET `/users/:userId/elo`**: Get a user's Elo points and level.

## Business Logic

### Review Impact:
- **Positive Reviews**: Players who receive good reviews (ratings of 3 or above) will gain Elo points, which will increase their Elo level.
- **Negative Reviews**: Players with bad reviews (ratings below 3) will lose Elo points, which will decrease their Elo level.
- **Average Rating**: Players have an average rating that is updated based on the reviews they receive.
  
### Elo Levels:
- **Bronze**: 0 to 999 Elo points
- **Silver**: 1000 to 1999 Elo points
- **Gold**: 2000 to 2999 Elo points
- **Platinum**: 3000 to 3999 Elo points
- **Diamond**: 4000 to 4999 Elo points
- **Legendary**: 5000+ Elo points

### Player Review System:
- Players can leave reviews for each other after a match. The reviews impact their Elo points and levels.
- The average rating of a player is calculated based on the reviews they receive.

## Contribution

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
