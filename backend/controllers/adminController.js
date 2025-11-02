import User from "../models/Users.js";
import Class from "../models/Class.js";

// Create Teacher
export const createTeacher = async (req, res) => {
  try {
    const { name, email, password, profile } = req.body;
    
    const teacherExists = await User.findOne({ email });
    if (teacherExists) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    const teacher = await User.create({
      name,
      email,
      password,
      role: "teacher",
      profile
    });

    res.status(201).json({
      _id: teacher._id,
      name: teacher.name,
      email: teacher.email,
      role: teacher.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Class
export const createClass = async (req, res) => {
  try {
    const { name, grade, section, teacher, schedule } = req.body;
    
    const classExists = await Class.findOne({ name, grade, section });
    if (classExists) {
      return res.status(400).json({ message: "Class already exists" });
    }

    const newClass = await Class.create({
      name,
      grade,
      section,
      teacher,
      schedule
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("classId");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Dashboard Stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalTeachers = await User.countDocuments({ role: "teacher" });
    const totalClasses = await Class.countDocuments();
    
    res.json({
      totalStudents,
      totalTeachers,
      totalClasses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};