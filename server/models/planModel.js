// models/planModel.js
const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name of the plan (e.g., "Basic", "Pro", "Enterprise")
    unique: true,    // Plan name should be unique
  },
  description: {
    type: String,
    required: true, // A brief description of the plan
  },
  price: {
    type: Number,
    required: true, // Price of the plan in dollars or the currency you prefer
  },
  features: [
    {
      type: String, // List of features offered by the plan (e.g., "10 Posts/Month", "Analytics", etc.)
    },
  ],
  duration: {
    type: String,
    required: true, // Duration for which the plan is valid (e.g., "1 Month", "3 Months", "1 Year")
  },
  created_at: {
    type: Date,
    default: Date.now, // Timestamp when the plan was created
  },
  updated_at: {
    type: Date,
    default: Date.now, // Timestamp when the plan was last updated
  },
});

module.exports = mongoose.model("Plan", planSchema);
