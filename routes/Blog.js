const express = require("express");

const {
  verifyTokenAndAuthorization,
  verifyToken,
  verifyTokenAndAdmin,
} = require("./VerifyToken.js");

const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController.js");

const router = express.Router();

// POST route to create a new blog
router.post("/",verifyTokenAndAdmin, createBlog);

// GET route to retrieve all blogs
router.get("/", getAllBlogs);

// GET route to retrieve a single blog by ID
router.get("/:id", getBlogById);

// PUT route to update a blog by ID
router.put("/:id",verifyTokenAndAdmin, updateBlog);

// DELETE route to delete a blog by ID
router.delete("/:id",verifyTokenAndAdmin, deleteBlog);

module.exports = router;
