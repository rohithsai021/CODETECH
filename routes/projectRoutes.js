const express = require('express');
const router = express.Router();
const Project = require('../models/projectModel');

// Add a project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    await project.save();
    res.status(201).send(project);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
