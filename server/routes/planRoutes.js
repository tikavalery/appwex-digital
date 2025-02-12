// routes/planRoutes.js
const express = require("express");
const router = express.Router();

// Import the plan controller functions
const {
  createPlan,
  getPlans,
  getPlanById,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");

// Routes for plan management
router.post("/", createPlan); // Create a new plan
router.get("/", getPlans); // Get all plans
router.get("/:id", getPlanById); // Get a plan by ID
router.put("/:id", updatePlan); // Update a plan by ID
router.delete("/:id", deletePlan); // Delete a plan by ID

module.exports = router;
