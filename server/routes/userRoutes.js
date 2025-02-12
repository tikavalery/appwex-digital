// routes/userRoutes.js
const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

// Create a new user (sign-up)
router.post("/", createUser);

// Get all users (admin-only access)
router.get("/", getUsers);

// Get a single user by ID (admin-only or self-view)
router.get("/:id", getUserById);

// Update a user's information (admin or the user itself)
router.put("/:id", updateUser);

// Delete a user (admin-only)
router.delete("/:id", deleteUser);

// User login (authentication)
router.post("/login", loginUser);

module.exports = router;
