import { University } from "../models/university.model.js";

// Create a university
export const createUniversity = async (req, res) => {
  try {
    const university = new University(req.body);
    await university.save();
    res.status(201).json({ message: "University created", university });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all universities
export const getAllUniversities = async (req, res) => {
  try {
    const universities = await University.find().sort({ createdAt: -1 });
    res.status(200).json(universities);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch universities" });
  }
};

// Get university by ID
export const getUniversityById = async (req, res) => {
  try {
    const university = await University.findById(req.params.id);
    if (!university) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json(university);
  } catch (error) {
    res.status(400).json({ message: "Invalid University ID" });
  }
};

// Update university
export const updateUniversity = async (req, res) => {
  try {
    const updated = await University.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: "University updated", updated });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete university
export const deleteUniversity = async (req, res) => {
  try {
    const deleted = await University.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "University not found" });
    }
    res.status(200).json({ message: "University deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
