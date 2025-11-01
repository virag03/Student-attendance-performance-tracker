import express from "express";
import dotenv from "dotenv";
// import User from "./models/Users.js";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
// import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
// app.use("/api/student", studentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
