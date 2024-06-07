import express from "express";
import { Course } from "../models/Course.js";
import bcrypt from "bcrypt";
import { verifyAdmin } from "./auth.js";
const router = express.Router();

router.post("/add", verifyAdmin, async (req, res) => {
  try {
    const { name, detail, price, hours, imageUrl } = req.body;
    const newcourse = new Course({
      name,
      detail,
      price,
      hours,
      imageUrl,
    });
    await newcourse.save();
    return res.json({ add: true });
  } catch (err) {
    return res.json({ message: "Error in adding a course" });
  }
});

router.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    return res.json(courses);
  } catch (err) {
    return res.json(err);
  }
});

router.get("/course/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById({ _id: id });
    return res.json(course);
  } catch (err) {
    return res.json(err);
  }
});

router.put("/course/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndUpdate({ _id: id }, req.body);
    return res.json({ updated: true, course });
  } catch (err) {
    return res.json(err);
  }
});

router.delete("/course/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findByIdAndDelete({ _id: id });
    return res.json({ deleted: true, course });
  } catch (err) {
    return res.json(err);
  }
});

export { router as courseRouter };
