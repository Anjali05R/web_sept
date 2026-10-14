
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 col-md mx-auto w-50">

        <h3 className="text-center mb-4">Login Page</h3>

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

        <button
          type="button"
          className="btn btn-primary w-100"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center">
          Don't have an account?{" "}
          <a href="/signup" onClick={handleSignup}>
            Sign up
          </a>
        </p>

      </div>
    </div>
  );
}

