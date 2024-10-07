const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel');

// Add a blog post
router.post('/', async (req, res) => {
  const blog = new Blog(req.body);
  try {
    await blog.save();
    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).send(blogs);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
