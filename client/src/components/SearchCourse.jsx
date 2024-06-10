import React, { useState } from "react";
import CourseCard from "./CourseCard";
import "../css/Course.css";

const SearchCourse = ({ courses, role }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCourses = courses.filter(
    (course) =>
      course.name &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Buscar cursos..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} role={role} />
          ))
        ) : (
          <p className="no-results">No se encontraron cursos.</p>
        )}
      </div>
    </div>
  );
};

export default SearchCourse;
