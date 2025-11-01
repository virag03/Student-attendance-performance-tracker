import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    schedule: {
      days: [String],
      startTime: String,
      endTime: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Class", classSchema);
