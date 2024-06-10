import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [courses, setCourses] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3001/dashboard")
      .then((res) => {
        if (res.data.ok) {
          setStudents(res.data.student);
          setAdmin(res.data.admin);
          setCourses(res.data.course);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Total Courses</h2> <br />
        <h2>{courses}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Students</h2> <br />
        <h2>{students}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Total Admins</h2> <br />
        <h2>{admin}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
