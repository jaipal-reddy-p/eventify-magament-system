// src/pages/UserDashboardPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/style.css";
import { useNavigate } from "react-router-dom";

const UserDashboardPage = () => {
  const [tickets, setTickets] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      navigate("/login");
      return;
    }
    setUserId(storedUserId);
    fetchTickets(storedUserId);
  }, []);

  const fetchTickets = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/tickets/user/${id}`,
        { withCredentials: true }
      );
      console.log("Tickets fetched:", response.data);
      setTickets(response.data);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">My Booked Tickets</h1>

      <div className="dashboard-actions">
        <button className="explore-button" onClick={() => navigate("/events")}>
          🎉 Book a New Ticket
        </button>
      </div>

      {tickets.length === 0 ? (
        <p>
          <center>No tickets booked yet.</center>
        </p>
      ) : (
        <div className="ticket-grid">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h3>Event: {ticket.event.title}</h3>
              <p>
                <strong>Type:</strong> {ticket.ticketType}
              </p>
              <p>
                <strong>Status:</strong> {ticket.status}
              </p>
              <p>
                <strong>Date:</strong> {ticket.event.date}
              </p>
              <button className="cancel-button">Cancel (Coming Soon)</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;