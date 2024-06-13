import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import "../css/Course.css";
import SearchCourse from "./SearchCourse";

const Courses = ({ role }) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/course/courses")
      .then((res) => {
        console.log("Datos recibidos:", res.data); // Verificar los datos recibidos
        // Si los datos son un array de cursos, filtra por 'name'
        const validCourses = res.data.filter((course) => course && course.name);
        setCourses(validCourses);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="course-back">
      <SearchCourse courses={courses} role={role} />
    </div>
  );
};

export default Courses;
