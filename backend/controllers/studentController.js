import Attendance from "../models/Attendance.js";
import Grade from "../models/Grade.js";
import Class from "../models/Class.js";

// Get Student Attendance
export const getMyAttendance = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const query = { student: req.user._id };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query)
      .populate("class", "name")
      .sort({ date: -1 });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Grades
export const getMyGrades = async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.user._id })
      .populate("class", "name")
      .sort({ createdAt: -1 });

    // Calculate overall performance
    const overallStats = await Grade.aggregate([
      { $match: { student: req.user._id } },
      {
        $group: {
          _id: "$subject",
          averageMarks: { $avg: "$marks" },
          totalAssignments: { $sum: 1 }
        }
      }
    ]);

    res.json({ grades, overallStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Class Info
export const getMyClass = async (req, res) => {
  try {
    const classInfo = await Class.findById(req.user.classId)
      .populate("teacher", "name email")
      .populate("students", "name email");

    res.json(classInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Student Dashboard
export const getDashboard = async (req, res) => {
  try {
    const studentId = req.user._id;
    
    // Get attendance summary
    const attendanceSummary = await Attendance.aggregate([
      { $match: { student: studentId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent grades
    const recentGrades = await Grade.find({ student: studentId })
      .populate("class", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get overall average
    const overallAverage = await Grade.aggregate([
      { $match: { student: studentId } },
      {
        $group: {
          _id: null,
          average: { $avg: "$marks" }
        }
      }
    ]);

    res.json({
      attendanceSummary,
      recentGrades,
      overallAverage: overallAverage[0]?.average || 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};