// // routes/userRoutes.js
// const express = require("express");
// const router = express.Router();
// const { createUser, getUsers } = require("../controllers/userController");

// // Route for creating a user
// router.post("/", createUser);

// // Route for getting users
// router.get("/", getUsers);

// module.exports = router;

// routes/companyRoutes.js
const express = require("express");
const router = express.Router();

// Import controller functions
const {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  addSocialMediaAccount,
  updateSocialMediaAccount,
  deleteSocialMediaAccount,
} = require("../controllers/companyController");

// Routes for company management
router.post("/", createCompany); // Create a new company
router.get("/", getCompanies); // Get all companies
router.get("/:id", getCompanyById); // Get a company by ID
router.put("/:id", updateCompany); // Update a company's details
router.delete("/:id", deleteCompany); // Delete a company

// Routes for managing social media accounts
router.post("/social-media", addSocialMediaAccount); // Add social media account
router.put("/social-media", updateSocialMediaAccount); // Update social media account
router.delete("/social-media/:companyId/:platform", deleteSocialMediaAccount); // Delete social media account

module.exports = router;

