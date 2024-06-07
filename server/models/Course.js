import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  detail: { type: String, required: true },
  price: { type: String, required: true },
  hours: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const courseModel = mongoose.model("Course", courseSchema);
export { courseModel as Course };
