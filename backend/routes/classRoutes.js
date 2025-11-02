import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Class from "../models/Class.js";

const router = express.Router();

// Get all classes (accessible by all authenticated users)
router.get("/", protect, async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("teacher", "name email")
      .populate("students", "name email");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;