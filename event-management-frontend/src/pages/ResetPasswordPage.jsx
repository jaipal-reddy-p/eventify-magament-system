import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:9090/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        setMessage("Password reset successful! Redirecting to login...");
        localStorage.removeItem("resetEmail");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        const data = await response.json();
        setMessage(data.message || "Password reset failed.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Reset Password</h2>
        <form onSubmit={handleReset} className="form-content">
          <div className="form-group">
            <label className="form-label">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Reset Password
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;