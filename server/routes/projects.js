import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Fetch all projects
// @route   GET /api/projects
// @access  Public
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Fetch single project
// @route   GET /api/projects/:id
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private/Admin
router.post("/", protect, async (req, res) => {
  const { title, shortDescription, longDescription, imageUrl } = req.body;
  const projectId = title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
  const project = new Project({
    id: projectId,
    title,
    shortDescription,
    longDescription,
    imageUrl,
  });
  try {
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid project data", error: error.message });
  }
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private/Admin
router.put("/:id", protect, async (req, res) => {
  const { title, shortDescription, longDescription, imageUrl } = req.body;
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (project) {
      project.title = title || project.title;
      project.shortDescription = shortDescription || project.shortDescription;
      project.longDescription = longDescription || project.longDescription;
      project.imageUrl = imageUrl || project.imageUrl;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Projeto não encontrado" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid project data", error: error.message });
  }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await Project.deleteOne({ id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ message: "Projeto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
