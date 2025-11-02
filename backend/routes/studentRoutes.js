import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  getMyAttendance,
  getMyGrades,
  getMyClass,
  getDashboard
} from "../controllers/studentController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("student"));

router.get("/attendance", getMyAttendance);
router.get("/grades", getMyGrades);
router.get("/class", getMyClass);
router.get("/dashboard", getDashboard);

export default router;