import express from "express";
import Company from "../models/Company.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Fetch all companies
// @route   GET /api/companies
// @access  Public
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find({}).sort("order");
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Create a company
// @route   POST /api/companies
// @access  Private/Admin
router.post("/", protect, async (req, res) => {
  const { name, logoSvg, order } = req.body;
  try {
    const company = new Company({ name, logoSvg, order });
    const createdCompany = await company.save();
    res.status(201).json(createdCompany);
  } catch (error) {
    res.status(400).json({ message: "Dados inválidos", error: error.message });
  }
});

// @desc    Update a company
// @route   PUT /api/companies/:id
// @access  Private/Admin
router.put("/:id", protect, async (req, res) => {
  const { name, logoSvg, order } = req.body;
  try {
    const company = await Company.findById(req.params.id);
    if (company) {
      company.name = name ?? company.name;
      company.logoSvg = logoSvg ?? company.logoSvg;
      company.order = order ?? company.order;

      const updatedCompany = await company.save();
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: "Empresa não encontrada" });
    }
  } catch (error) {
    res.status(400).json({ message: "Dados inválidos", error: error.message });
  }
});

// @desc    Delete a company
// @route   DELETE /api/companies/:id
// @access  Private/Admin
router.delete("/:id", protect, async (req, res) => {
  try {
    const result = await Company.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Empresa não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
