import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  enrollmentDate: { type: Date, default: Date.now },
});

const enrollmentModel = mongoose.model("Enrollment", enrollmentSchema);
export { enrollmentModel as Enrollment };
