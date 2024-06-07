import React, { useState } from "react";
import "../css/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [hours, setHours] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/course/add", {
        name,
        detail,
        price,
        hours,
        imageUrl,
      })
      .then((res) => {
        if (res.data.added) {
          navigate("/courses");
          console.log(res);
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add Course</h2>
        <div className="form-group">
          <label htmlFor="course">Course Name:</label>
          <input
            type="text"
            id="course"
            name="course"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="detail">Detail:</label>
          <input
            type="text"
            id="detail"
            name="detail"
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="text"
            id="hours"
            name="hours"
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCourse;
