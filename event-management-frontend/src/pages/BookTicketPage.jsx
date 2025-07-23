// src/pages/BookTicketPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../assets/style.css";

const BookTicketPage = () => {
  const { eventId } = useParams();
  const [ticketType, setTicketType] = useState("REGULAR");
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      navigate("/login");
      return;
    }
    setUserId(storedUserId);
  }, [navigate]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9090/api/tickets/book",
        {
          ticketType: ticketType,
          event: { id: parseInt(eventId) },
          user: { id: parseInt(userId) },
        },
        { withCredentials: true }
      );

      alert("🎟️ Ticket booked successfully!");
      navigate("/user/dashboard");
    } catch (error) {
      alert("❌ Booking failed: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Book Your Ticket</h2>
        <form onSubmit={handleBooking} className="form-content">
          <div className="form-group">
            <label className="form-label">Select Ticket Type</label>
            <select
              className="form-input"
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
            >
              <option value="REGULAR">🎫 Regular</option>
              <option value="VIP">⭐ VIP</option>
            </select>
          </div>

          <button type="submit" className="form-button">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookTicketPage;