import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import Class from "../models/Class.js";
import User from "../models/Users.js";

// Mark Attendance
export const markAttendance = async (req, res) => {
  try {
    const { classId, date, attendanceRecords } = req.body;

    const attendancePromises = attendanceRecords.map(record =>
      Attendance.findOneAndUpdate(
        { student: record.studentId, class: classId, date },
        {
          status: record.status,
          remarks: record.remarks
        },
        { upsert: true, new: true }
      )
    );

    await Promise.all(attendancePromises);
    res.json({ message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Grade
export const addGrade = async (req, res) => {
  try {
    const { studentId, classId, subject, assignment, marks, totalMarks, comments } = req.body;

    const grade = await Grade.create({
      student: studentId,
      class: classId,
      subject,
      assignment,
      marks,
      totalMarks,
      comments
    });

    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Classes
export const getMyClasses = async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id })
      .populate("students", "name email");
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Class Students
export const getClassStudents = async (req, res) => {
  try {
    const { classId } = req.params;
    const students = await User.find({ classId, role: "student" })
      .select("name email profile");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};