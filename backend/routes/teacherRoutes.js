import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  markAttendance,
  addGrade,
  getMyClasses,
  getClassStudents
} from "../controllers/teacherController.js";

const router = express.Router();

router.use(protect);
router.use(authorize("teacher"));

router.post("/attendance", markAttendance);
router.post("/grades", addGrade);
router.get("/classes", getMyClasses);
router.get("/classes/:classId/students", getClassStudents);

export default router;