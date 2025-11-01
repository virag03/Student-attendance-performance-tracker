import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  subject: { type: String, required: true },
  assignment: { type: String, required: true },
  marks: { type: Number, required: true, min: 0, max: 100 },
  totalMarks: { type: Number, required: true, default: 100 },
  grade: String,
  comments: String
}, { timestamps: true });

gradeSchema.pre("save", function (next) {
  const percentage = (this.marks / this.totalMarks) * 100;
  
  if (percentage >= 90) this.grade = "A+";
  else if (percentage >= 80) this.grade = "A";
  else if (percentage >= 70) this.grade = "B";
  else if (percentage >= 60) this.grade = "C";
  else if (percentage >= 50) this.grade = "D";
  else this.grade = "F";
  
  next();
});

export default mongoose.model("Grade", gradeSchema);