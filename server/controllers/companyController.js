// controllers/companyController.js
const Company = require("../models/companyModel");

// Create a new company
const createCompany = async (req, res) => {
  const { name, industry, description, website_url, contact_email } = req.body;

  try {
    // Check if the company already exists
    const companyExists = await Company.findOne({ name });
    if (companyExists) {
      return res.status(400).json({ message: "Company already exists" });
    }

    // Create new company
    const newCompany = new Company({
      name,
      industry,
      description,
      website_url,
      contact_email,
    });

    await newCompany.save();
    res.status(201).json(newCompany);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all companies (admin only)
const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a company by ID
const getCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a company's details
const updateCompany = async (req, res) => {
  const { id } = req.params;
  const { name, industry, description, website_url, contact_email } = req.body;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update company details
    company.name = name || company.name;
    company.industry = industry || company.industry;
    company.description = description || company.description;
    company.website_url = website_url || company.website_url;
    company.contact_email = contact_email || company.contact_email;

    await company.save();
    res.status(200).json(company);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a company (admin only)
const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    await company.remove();
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a social media account to a company
const addSocialMediaAccount = async (req, res) => {
  const { companyId, platform, username, password } = req.body;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Add social media account to the company
    company.social_media_accounts.push({ platform, username, password });
    await company.save();

    res.status(201).json({ message: "Social media account added", company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a social media account of a company
const updateSocialMediaAccount = async (req, res) => {
  const { companyId, platform, username, password } = req.body;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    const accountIndex = company.social_media_accounts.findIndex(
      (account) => account.platform === platform
    );

    if (accountIndex === -1) {
      return res.status(404).json({ message: "Social media account not found" });
    }

    // Update the social media account details
    company.social_media_accounts[accountIndex].username = username || company.social_media_accounts[accountIndex].username;
    company.social_media_accounts[accountIndex].password = password || company.social_media_accounts[accountIndex].password;

    await company.save();

    res.status(200).json({ message: "Social media account updated", company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a social media account from a company
const deleteSocialMediaAccount = async (req, res) => {
  const { companyId, platform } = req.params;

  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Find and remove the social media account
    const updatedAccounts = company.social_media_accounts.filter(
      (account) => account.platform !== platform
    );

    if (updatedAccounts.length === company.social_media_accounts.length) {
      return res.status(404).json({ message: "Social media account not found" });
    }

    company.social_media_accounts = updatedAccounts;

    await company.save();
    res.status(200).json({ message: "Social media account deleted", company });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
  addSocialMediaAccount,
  updateSocialMediaAccount,
  deleteSocialMediaAccount,
};


