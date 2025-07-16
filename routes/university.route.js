import express from "express";
import {
  createUniversity,
  getAllUniversities,
  getUniversityById,
  updateUniversity,
  deleteUniversity,
} from "../controllers/university.controller.js";

const router = express.Router();

// ✅ Create a university
router.post("/", createUniversity);

// ✅ Get all universities
router.get("/", getAllUniversities);

// ✅ Get a single university by ID
router.get("/:id", getUniversityById);

// ✅ Update university by ID
router.put("/:id", updateUniversity);

// ✅ Delete university by ID
router.delete("/:id", deleteUniversity);

export default router;
