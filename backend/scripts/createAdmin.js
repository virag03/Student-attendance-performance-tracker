import mongoose from "mongoose";
import User from "../models/Users.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const adminExists = await User.findOne({ email: "admin@school.com" });
    if (!adminExists) {
      await User.create({
        name: "System Admin",
        email: "admin@school.com",
        password: "admin123",
        role: "admin"
      });
      console.log("✅ Default admin created successfully");
    } else {
      console.log("ℹ️ Admin already exists");
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  }
};

createAdmin();