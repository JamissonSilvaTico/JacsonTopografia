import express from 'express';
import HeroContent from '../models/HeroContent.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get hero content
// @route   GET /api/content/hero
// @access  Public
router.get('/hero', async (req, res) => {
    try {
        const heroContent = await HeroContent.findOne();
        if (heroContent) {
            res.json(heroContent);
        } else {
            res.status(404).json({ message: 'Conteúdo não encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update hero content
// @route   PUT /api/content/hero
// @access  Private/Admin
router.put('/hero', protect, async (req, res) => {
    try {
        const heroContent = await HeroContent.findOne();
        if (heroContent) {
            const { mainTitle, subtitle, description, buttonText, buttonLink, imageUrl } = req.body;
            heroContent.mainTitle = mainTitle || heroContent.mainTitle;
            heroContent.subtitle = subtitle || heroContent.subtitle;
            heroContent.description = description || heroContent.description;
            heroContent.buttonText = buttonText || heroContent.buttonText;
            heroContent.buttonLink = buttonLink || heroContent.buttonLink;
            heroContent.imageUrl = imageUrl || heroContent.imageUrl;

            const updatedContent = await heroContent.save();
            res.json(updatedContent);
        } else {
            res.status(404).json({ message: 'Conteúdo não encontrado.' });
        }
    } catch (error) {
         res.status(400).json({ message: 'Dados inválidos', error: error.message });
    }
});

export default router;
