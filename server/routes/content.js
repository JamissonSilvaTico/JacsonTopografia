import express from "express";
import HeroContent from "../models/HeroContent.js";
import AboutPageContent from "../models/AboutPageContent.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get hero content
// @route   GET /api/content/hero
// @access  Public
router.get("/hero", async (req, res) => {
  try {
    const heroContent = await HeroContent.findOne();
    if (heroContent) {
      res.json(heroContent);
    } else {
      res.status(404).json({ message: "Conteúdo não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update hero content
// @route   PUT /api/content/hero
// @access  Private/Admin
router.put("/hero", protect, async (req, res) => {
  try {
    const heroContent = await HeroContent.findOne();
    if (heroContent) {
      const {
        mainTitle,
        subtitle,
        description,
        buttonText,
        buttonLink,
        imageUrl,
      } = req.body;
      heroContent.mainTitle = mainTitle || heroContent.mainTitle;
      heroContent.subtitle = subtitle || heroContent.subtitle;
      heroContent.description = description || heroContent.description;
      heroContent.buttonText = buttonText || heroContent.buttonText;
      heroContent.buttonLink = buttonLink || heroContent.buttonLink;
      heroContent.imageUrl = imageUrl || heroContent.imageUrl;

      const updatedContent = await heroContent.save();
      res.json(updatedContent);
    } else {
      res.status(404).json({ message: "Conteúdo não encontrado." });
    }
  } catch (error) {
    res.status(400).json({ message: "Dados inválidos", error: error.message });
  }
});

// --- About Page ---
// @desc    Get about page content
// @route   GET /api/content/aboutpage
// @access  Public
router.get("/aboutpage", async (req, res) => {
  try {
    const content = await AboutPageContent.findOne();
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: "Conteúdo não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update about page content
// @route   PUT /api/content/aboutpage
// @access  Private/Admin
router.put("/aboutpage", protect, async (req, res) => {
  try {
    const content = await AboutPageContent.findOne();
    if (content) {
      const { preTitle, title, subtitle, imageUrl, paragraph1, paragraph2 } =
        req.body;

      content.preTitle = preTitle || content.preTitle;
      content.title = title || content.title;
      content.subtitle = subtitle || content.subtitle;
      content.imageUrl = imageUrl || content.imageUrl;
      content.paragraph1 = paragraph1 || content.paragraph1;
      content.paragraph2 = paragraph2 || content.paragraph2;

      const updatedContent = await content.save();
      res.json(updatedContent);
    } else {
      res.status(404).json({ message: "Conteúdo não encontrado." });
    }
  } catch (error) {
    res.status(400).json({ message: "Dados inválidos", error: error.message });
  }
});

export default router;
