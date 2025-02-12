// models/subscriptionModel.js
const mongoose = require("mongoose");

// Define the subscription schema
const subscriptionSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Reference to the Company model
      required: true, // Each subscription must be linked to a company
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan", // Reference to the Plan model
      required: true, // Each subscription must be linked to a plan
    },
    status: {
      type: String,
      enum: ["active", "inactive", "paused", "expired"], // The subscription status
      default: "active", // Default status is active
    },
    startDate: {
      type: Date,
      required: true, // Subscription must have a start date
    },
    endDate: {
      type: Date,
      required: true, // Subscription must have an end date
    },
    renewalDate: {
      type: Date, // The date the subscription is renewed (if applicable)
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"], // The payment status of the subscription
      default: "pending", // Default is pending
    },
    planDetails: {
      type: String, // Additional details about the plan (e.g., features)
    },
    created_at: {
      type: Date,
      default: Date.now, // Timestamp when the subscription was created
    },
    updated_at: {
      type: Date,
      default: Date.now, // Timestamp when the subscription was last updated
    },
  },
  {
    timestamps: true, // Automatically adds created_at and updated_at fields
  }
);

// Create the model using the schema
const Subscription = mongoose.model("Subscription", subscriptionSchema);

// Export the model for use in controllers
module.exports = Subscription;
