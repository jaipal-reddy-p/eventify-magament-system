// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/style.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      alert("Login successful!");

      // ✅ Store userId for dashboard access
      if (data.userId) {
        localStorage.setItem("userId", data.userId);
      }

      // ✅ Redirect based on role
      if (data.role === "USER") {
        navigate("/user/dashboard");
      } else if (data.role === "ORGANIZER") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign in to Eventify</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />

        <button type="submit" className="form-button">
          Login
        </button>
      </form>

      <div className="form-footer">
        <Link to="/register" className="form-link">
          New user? Register here
        </Link>
        <br />
        <Link to="/forgot-password" className="form-link">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;