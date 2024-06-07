import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course, role }) => {
  const { name, detail, imageUrl, price = "", hours = "" } = course;
  return (
    <div className="course-card">
      <img src={imageUrl} alt={name} className="course-image" />
      <div className="course-details">
        <h3>{name}</h3>
        <p>{detail}</p>
        <p>
          Price:
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p>Duration: {hours} hs</p>
      </div>
      {role === "admin" && (
        <div className="course-actions">
          <button>
            <Link to={`/course/${course._id}`} className="btn-link">
              edit
            </Link>
          </button>
          <button>
            <Link to={`/delete/${course._id}`} className="btn-link">
              delete
            </Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
