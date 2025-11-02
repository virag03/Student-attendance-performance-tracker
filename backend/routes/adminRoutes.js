import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createTeacher,
  createClass,
  getAllUsers,
  getDashboardStats
} from "../controllers/adminController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

router.post("/teachers", createTeacher);
router.post("/classes", createClass);
router.get("/users", getAllUsers);
router.get("/dashboard", getDashboardStats);

export default router;