import express from "express";
import SiteSettings from "../models/SiteSettings.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Get site settings
// @route   GET /api/settings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    if (settings) {
      res.json(settings);
    } else {
      res.status(404).json({ message: "Configurações não encontradas." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Update site settings
// @route   PUT /api/settings
// @access  Private/Admin
router.put("/", protect, async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (settings) {
      // Update fields from request body
      settings.logoType = req.body.logoType ?? settings.logoType;
      settings.logoTextLine1 = req.body.logoTextLine1 ?? settings.logoTextLine1;
      settings.logoTextLine2 = req.body.logoTextLine2 ?? settings.logoTextLine2;
      settings.logoImageUrl = req.body.logoImageUrl ?? settings.logoImageUrl;

      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      res.status(404).json({ message: "Configurações não encontradas." });
    }
  } catch (error) {
    res.status(400).json({ message: "Dados inválidos", error: error.message });
  }
});

export default router;
