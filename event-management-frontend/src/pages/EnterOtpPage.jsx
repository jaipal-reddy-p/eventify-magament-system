import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const EnterOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:9090/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, otp }),
        }
      );

      if (response.ok) {
        setMessage("OTP verified successfully.");
        navigate("/reset-password");
      } else {
        const data = await response.json();
        setMessage(data.message || "OTP verification failed.");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Enter OTP</h2>
        <form onSubmit={handleVerifyOtp} className="form-content">
          <div className="form-group">
            <label className="form-label">OTP</label>
            <input
              type="text"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="form-button">
            Verify OTP
          </button>
          {message && <p className="form-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EnterOtpPage;
