// RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/style.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:9090/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Registration failed");
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="form-title">Register</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your full name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Create a password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="USER">User</option>
              <option value="ORGANIZER">Organizer</option>
            </select>
          </div>
          <button type="submit" className="form-button">
            Register
          </button>
        </form>
        <div className="form-footer">
          <Link to="/login" className="form-link">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}
