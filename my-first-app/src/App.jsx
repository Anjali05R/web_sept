
import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Assignments from "./pages/Assignments";
import Attendances from "./pages/Attendances";
import Courses from "./pages/Courses";
import Profile from "./pages/Profile";
export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/attendance" element={<Attendances />} />
         <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

