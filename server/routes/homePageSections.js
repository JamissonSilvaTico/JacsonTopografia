import express from "express";
import HomePageSection from "../models/HomePageSection.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Fetch visible home page sections
// @route   GET /api/home-sections
// @access  Public
router.get("/", async (req, res) => {
  try {
    const sections = await HomePageSection.find({ visible: true }).sort(
      "order"
    );
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Fetch all home page sections
// @route   GET /api/home-sections/all
// @access  Private/Admin
router.get("/all", protect, async (req, res) => {
  try {
    const sections = await HomePageSection.find({}).sort("order");
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Create a new home page section
// @route   POST /api/home-sections
// @access  Private/Admin
router.post("/", protect, async (req, res) => {
  const { title, subtitle, content, order, visible, imageUrl } = req.body;
  try {
    const section = new HomePageSection({
      title,
      subtitle,
      content,
      order,
      visible,
      imageUrl,
      type: "text", // User-created sections are always 'text'
    });
    const createdSection = await section.save();
    res.status(201).json(createdSection);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Dados de seção inválidos", error: error.message });
  }
});

// @desc    Update a home page section
// @route   PUT /api/home-sections/:id
// @access  Private/Admin
router.put("/:id", protect, async (req, res) => {
  try {
    const section = await HomePageSection.findById(req.params.id);
    if (section) {
      section.title = req.body.title ?? section.title;
      section.order = req.body.order ?? section.order;
      section.visible = req.body.visible ?? section.visible;

      if (req.body.hasOwnProperty("subtitle")) {
        section.subtitle = req.body.subtitle;
      }
      if (req.body.hasOwnProperty("imageUrl")) {
        section.imageUrl = req.body.imageUrl;
      }

      // Only allow content update for 'text' sections
      if (section.type === "text") {
        if (req.body.hasOwnProperty("content")) {
          section.content = req.body.content;
        }
      }

      const updatedSection = await section.save();
      res.json(updatedSection);
    } else {
      res.status(404).json({ message: "Seção não encontrada" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Dados de seção inválidos", error: error.message });
  }
});

// @desc    Delete a home page section
// @route   DELETE /api/home-sections/:id
// @access  Private/Admin
router.delete("/:id", protect, async (req, res) => {
  try {
    const section = await HomePageSection.findById(req.params.id);

    if (section) {
      // Prevent deletion of 'services' section to avoid breaking site logic
      if (section.type === "services") {
        return res
          .status(400)
          .json({ message: 'A seção de "Serviços" não pode ser excluída.' });
      }
      await section.deleteOne();
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Seção não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
