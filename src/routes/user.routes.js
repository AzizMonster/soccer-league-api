const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const { createUserSchema, updateUserSchema } = require("../validations/user.validation");
const validate = require("../middlewares/validation.middleware");

// CRUD Routes
userRouter.post("/", validate(createUserSchema), userController.createUser);  // Create a user
userRouter.get("/", userController.getAllUsers);                            // Get all users
userRouter.get("/:id", userController.getUserById);                         // Get a user by ID
userRouter.put("/:id", validate(updateUserSchema), userController.updateUser); // Update a user
userRouter.delete("/:id", userController.deleteUser);                       // Delete a user

module.exports = userRouter;
