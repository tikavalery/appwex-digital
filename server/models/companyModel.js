// models/companyModel.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,  // Each company name should be unique
  },
  industry: {
    type: String,
    required: true, // The industry the company operates in
  },
  description: {
    type: String,
    required: true, // A brief description of the company
  },
  website_url: {
    type: String,
    required: true,  // URL of the company's official website
  },
  contact_email: {
    type: String,
    required: true,  // A contact email for the company
    unique: true,
  },
  social_media_accounts: [
    {
      platform: {
        type: String, // Name of the social media platform (e.g., 'Facebook', 'Twitter')
        required: true,
      },
      username: {
        type: String, // Social media account's username
        required: true,
      },
      password: {
        type: String, // Social media account's password (hashed)
        required: true,
      },
    },
  ],
  created_at: {
    type: Date,
    default: Date.now, // Timestamp when the company was created
  },
  updated_at: {
    type: Date,
    default: Date.now, // Timestamp when the company was last updated
  },
  active: {
    type: Boolean,
    default: true, // To track whether the company's account is active or not
  },
});

module.exports = mongoose.model("Company", companySchema);
