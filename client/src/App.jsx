import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Courses from "./components/Courses";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import { useEffect, useState } from "react";
import Logout from "./components/Logout";
import axios from "axios";
import AddCourse from "./components/AddCourse";
import EditCourse from "./components/EditCourse";
import DeleteCourse from "./components/DeleteCourse";
import Registration from "./components/Registration";

function App() {
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/courses" element={<Courses role={role} />}></Route>
        <Route path="/login" element={<Login setRoleVar={setRole} />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>
        <Route path="/logout" element={<Logout setRole={setRole} />}></Route>
        <Route path="/addcourse" element={<AddCourse />}></Route>
        <Route path="/course/:id" element={<EditCourse />}></Route>
        <Route path="/delete/:id" element={<DeleteCourse />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
