
import React from "react";
import { useNavigate } from "react-router-dom";
 
export default function Signup() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    // For now, after signup go to dashboard
    navigate("/dashboard");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 col-md mx-auto w-50">

        <h3 className="text-center mb-4">Sign Up</h3>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Full Name"
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Confirm your password"
        />

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>

        <p className="text-center mt-3 mb-0">
          Already have an account?{" "}
          <a href="/" onClick={handleLogin}>
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

