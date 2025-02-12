// models/contentModel.js
const mongoose = require("mongoose");

// Define the content schema
const contentSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company", // Reference to the Company model
      required: true, // Each content entry must belong to a company
    },
    contentText: {
      type: String,
      required: true, // The main content (text) for the social media post
    },
    mediaUrl: {
      type: String, // URL of any media like images or videos
      required: false, // Media is optional, but might be provided for posts
    },
    instructions: {
      type: String, // Any instructions for editing or handling the content
      required: false, // Instructions are optional
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"], // Possible content status
      default: "pending", // Default status is "pending"
    },
    created_at: {
      type: Date,
      default: Date.now, // Timestamp when the content was created
    },
    updated_at: {
      type: Date,
      default: Date.now, // Timestamp when the content was last updated
    },
  },
  {
    timestamps: true, // Automatically adds created_at and updated_at fields
  }
);

// Create the model using the schema
const Content = mongoose.model("Content", contentSchema);

// Export the model for use in the controller
module.exports = Content;
