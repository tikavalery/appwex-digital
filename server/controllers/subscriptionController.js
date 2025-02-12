// controllers/subscriptionController.js
const Subscription = require("../models/subscriptionModel"); // Import the Subscription model
const Company = require("../models/companyModel"); // Import the Company model (for company checks)
const Plan = require("../models/planModel"); // Import the Plan model (for plan details)

// Create a new subscription
const createSubscription = async (req, res) => {
  const { companyId, planId, startDate, endDate, paymentStatus, planDetails } = req.body;

  try {
    // Check if the company exists
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Check if the plan exists
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Create a new subscription document
    const newSubscription = new Subscription({
      companyId,
      planId,
      startDate,
      endDate,
      paymentStatus: paymentStatus || "pending", // Default to pending if not provided
      planDetails,
    });

    // Save the new subscription
    await newSubscription.save();
    res.status(201).json({
      message: "Subscription created successfully",
      subscription: newSubscription,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all subscriptions for a specific company
const getSubscriptionsByCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const subscriptions = await Subscription.find({ companyId });

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(404).json({ message: "No subscriptions found for this company" });
    }

    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all subscriptions (for admin review or internal use)
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.status(200).json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update subscription status or details (e.g., renew, change plan, cancel)
const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { status, paymentStatus, renewalDate, planId } = req.body;

  try {
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Update the subscription fields
    if (status) subscription.status = status;
    if (paymentStatus) subscription.paymentStatus = paymentStatus;
    if (renewalDate) subscription.renewalDate = renewalDate;
    if (planId) {
      // If the plan is changed, check if the new plan exists
      const newPlan = await Plan.findById(planId);
      if (!newPlan) {
        return res.status(404).json({ message: "New plan not found" });
      }
      subscription.planId = planId;
    }

    // Update the timestamp
    subscription.updated_at = Date.now();

    // Save the updated subscription
    await subscription.save();
    res.status(200).json({
      message: "Subscription updated successfully",
      subscription,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a subscription by ID
const deleteSubscription = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    // Delete the subscription
    await subscription.remove();
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific subscription by ID (for detailed view or review)
const getSubscriptionById = async (req, res) => {
  const { id } = req.params;

  try {
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json(subscription);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSubscription,
  getSubscriptionsByCompany,
  getAllSubscriptions,
  updateSubscription,
  deleteSubscription,
  getSubscriptionById,
};
