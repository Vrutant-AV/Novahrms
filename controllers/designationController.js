const { Designation } = require("../models");

// Create Designation
const createDesignation = async (req, res) => {
  try {
    const { title, description } = req.body;
    const designation = await Designation.create({ title, description });
    res.status(201).json(designation);
  } catch (error) {
    res.status(500).json({ message: "Failed to create designation", error: error.message });
  }
};

// Get All Designations
const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.findAll();
    res.json(designations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch designations", error: error.message });
  }
};

// Get Designation by ID
const getDesignationById = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findByPk(id);
    if (!designation) return res.status(404).json({ message: "Designation not found" });
    res.json(designation);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch designation", error: error.message });
  }
};

// Update Designation
const updateDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const designation = await Designation.findByPk(id);
    if (!designation) return res.status(404).json({ message: "Designation not found" });

    await designation.update({ title, description });
    res.json(designation);
  } catch (error) {
    res.status(500).json({ message: "Failed to update designation", error: error.message });
  }
};

// Delete Designation
const deleteDesignation = async (req, res) => {
  try {
    const { id } = req.params;
    const designation = await Designation.findByPk(id);
    if (!designation) return res.status(404).json({ message: "Designation not found" });

    await designation.destroy();
    res.json({ message: "Designation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete designation", error: error.message });
  }
};

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};
