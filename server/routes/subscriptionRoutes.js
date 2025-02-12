// routes/subscriptionRoutes.js
const express = require("express");
const router = express.Router();

// Import the subscription controller functions
const {
  createSubscription,
  getSubscriptionsByCompany,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
  getSubscriptionById,
} = require("../controllers/subscriptionController");

// Route to create a new subscription
router.post("/", createSubscription); // POST /api/subscription - Create subscription

// Route to get all subscriptions for a specific company
router.get("/:companyId", getSubscriptionsByCompany); // GET /api/subscription/:companyId - Get subscriptions by company ID

// Route to get all subscriptions (for admin or internal use)
router.get("/", getAllSubscriptions); // GET /api/subscription - Get all subscriptions

// Route to update a specific subscription by ID
router.put("/:id", updateSubscription); // PUT /api/subscription/:id - Update subscription by ID

// Route to delete a subscription by ID
router.delete("/:id", deleteSubscription); // DELETE /api/subscription/:id - Delete subscription by ID

// Route to get a specific subscription by ID
router.get("/subscription/:id", getSubscriptionById); // GET /api/subscription/subscription/:id - Get subscription by ID

module.exports = router;

