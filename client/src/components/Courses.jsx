import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import "../css/Course.css";

const Courses = ({ role }) => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/course/courses")
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="course-back">
      <div className="course-list">
        {courses.map((course) => {
          return (
            <CourseCard
              key={course._id}
              course={course}
              role={role}
            ></CourseCard>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
