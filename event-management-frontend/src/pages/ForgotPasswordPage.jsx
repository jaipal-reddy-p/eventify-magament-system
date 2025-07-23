import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:9090/api/auth/request-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );
      if (response.ok) {
        setMessage("OTP sent to your email.");
        localStorage.setItem("resetEmail", email); // Save email for next page
        navigate("/enter-otp");
      } else {
        const data = await response.json();
        setMessage(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Forgot Password</h2>
        <form onSubmit={handleSendOtp} className="form-content">
          <div className="form-group">
            <label className="form-label">Registered Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Send OTP
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
