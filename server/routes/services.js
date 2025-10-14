import express from 'express';
import Service from '../models/Service.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all services
// @route   GET /api/services
// @access  Public
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({});
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Fetch single service
// @route   GET /api/services/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    // Note: The frontend uses a custom 'id' field, not mongo's '_id'
    const service = await Service.findOne({ id: req.params.id });
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Serviço não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
    const { title, shortDescription, longDescription, imageUrl } = req.body;
    const serviceId = title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    const service = new Service({
        id: serviceId,
        title,
        shortDescription,
        longDescription,
        imageUrl,
    });
    try {
        const createdService = await service.save();
        res.status(201).json(createdService);
    } catch (error) {
        res.status(400).json({ message: 'Invalid service data', error: error.message });
    }
});

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
router.put('/:id', protect, async (req, res) => {
    const { title, shortDescription, longDescription, imageUrl } = req.body;
    try {
        const service = await Service.findOne({ id: req.params.id });
        if (service) {
            service.title = title || service.title;
            service.shortDescription = shortDescription || service.shortDescription;
            service.longDescription = longDescription || service.longDescription;
            service.imageUrl = imageUrl || service.imageUrl;

            const updatedService = await service.save();
            res.json(updatedService);
        } else {
            res.status(404).json({ message: 'Serviço não encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid service data', error: error.message });
    }
});

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
    try {
        const result = await Service.deleteOne({ id: req.params.id });
        if (result.deletedCount > 0) {
            res.status(204).send(); // No Content
        } else {
            res.status(404).json({ message: 'Serviço não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
