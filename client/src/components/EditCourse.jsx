import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditCourse = () => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [price, setPrice] = useState("");
  const [hours, setHours] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:3001/course/course/" + id)
      .then((res) => {
        setName(res.data.name);
        setDetail(res.data.detail);
        setPrice(res.data.price || "");
        setHours(res.data.hours || "");
        setImageUrl(res.data.imageUrl);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/course/course/" + id, {
        name,
        detail,
        price,
        hours,
        imageUrl,
      })
      .then((res) => {
        if (res.data.updated) {
          navigate("/courses");
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Edit Course</h2>
        <div className="form-group">
          <label htmlFor="course">Course Name:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="detail">Detail:</label>
          <input
            type="text"
            id="detail"
            name="detail"
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="hours">Hours:</label>
          <input
            type="text"
            id="hours"
            name="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditCourse;
