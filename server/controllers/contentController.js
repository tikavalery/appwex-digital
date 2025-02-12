// controllers/contentController.js
const Content = require("../models/contentModel"); // Import the Content model

// Create a new content entry
const createContent = async (req, res) => {
  const { companyId, contentText, mediaUrl, instructions } = req.body;

  try {
    // Create a new content document
    const newContent = new Content({
      companyId,
      contentText,
      mediaUrl,
      instructions,
      status: "pending", // Set the default status as "pending"
    });

    // Save the new content entry
    await newContent.save();
    res.status(201).json({
      message: "Content created successfully",
      content: newContent,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all content entries for a specific company
const getContentByCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const content = await Content.find({ companyId });

    if (!content || content.length === 0) {
      return res.status(404).json({ message: "No content found for this company" });
    }

    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all content (for admin or internal review)
const getAllContent = async (req, res) => {
  try {
    const content = await Content.find();
    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update content entry (e.g., change status or modify text/media)
const updateContent = async (req, res) => {
  const { id } = req.params;
  const { contentText, mediaUrl, instructions, status } = req.body;

  try {
    // Find the content by ID
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Update the content fields
    content.contentText = contentText || content.contentText;
    content.mediaUrl = mediaUrl || content.mediaUrl;
    content.instructions = instructions || content.instructions;
    content.status = status || content.status; // E.g., from "pending" to "approved"

    // Update the timestamp
    content.updated_at = Date.now();

    // Save the updated content
    await content.save();
    res.status(200).json({
      message: "Content updated successfully",
      content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete content entry by ID
const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    // Delete the content
    await content.remove();
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get content by ID (for detailed view or review)
const getContentById = async (req, res) => {
  const { id } = req.params;

  try {
    const content = await Content.findById(id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createContent,
  getContentByCompany,
  getAllContent,
  updateContent,
  deleteContent,
  getContentById,
};
