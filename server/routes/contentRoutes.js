// routes/contentRoutes.js
const express = require("express");
const router = express.Router();

// Import the content controller functions
const {
  createContent,
  getContentByCompany,
  getAllContent,
  updateContent,
  deleteContent,
  getContentById,
} = require("../controllers/contentController");

// Routes for managing content

// Create a new content entry
router.post("/", createContent); // POST /api/content - Creates new content

// Get all content entries for a specific company
router.get("/:companyId", getContentByCompany); // GET /api/content/:companyId - Get content by company ID

// Get all content entries (for admin or internal review)
router.get("/", getAllContent); // GET /api/content - Get all content (admin view)

// Update a content entry by ID
router.put("/:id", updateContent); // PUT /api/content/:id - Update content by ID

// Delete a content entry by ID
router.delete("/:id", deleteContent); // DELETE /api/content/:id - Delete content by ID

// Get a specific content entry by ID (for detailed review)
router.get("/content/:id", getContentById); // GET /api/content/content/:id - Get specific content by ID

module.exports = router;
