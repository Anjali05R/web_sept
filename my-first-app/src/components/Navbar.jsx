
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
      <Link to="/dashboard" className="navbar-brand">
        My LMS
      </Link>

      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link to="/courses" className="nav-link">
            Courses
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/assignments" className="nav-link">
            Assignments
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/attendance" className="nav-link">
            Attendance
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </li>
      </ul>

      <span className="navbar-brand">Anjali</span>

      <button
        type="button"
        className="btn btn-outline-light"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

