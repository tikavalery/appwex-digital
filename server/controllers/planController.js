// controllers/planController.js
const Plan = require("../models/planModel");

// Create a new plan
const createPlan = async (req, res) => {
  const { name, description, price, features, duration } = req.body;

  try {
    // Check if the plan already exists
    const planExists = await Plan.findOne({ name });
    if (planExists) {
      return res.status(400).json({ message: "Plan with this name already exists" });
    }

    const newPlan = new Plan({
      name,
      description,
      price,
      features,
      duration,
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all plans
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get plan by ID
const getPlanById = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update plan details
const updatePlan = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, features, duration } = req.body;

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    // Update the plan fields
    plan.name = name || plan.name;
    plan.description = description || plan.description;
    plan.price = price || plan.price;
    plan.features = features || plan.features;
    plan.duration = duration || plan.duration;

    // Update the `updated_at` timestamp
    plan.updated_at = Date.now();

    await plan.save();
    res.status(200).json(plan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a plan
const deletePlan = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findById(id);
    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    await plan.remove();
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPlan, getPlans, getPlanById, updatePlan, deletePlan };
