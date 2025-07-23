import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/style.css";

const OrganizerDashboardPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9090/api/organizer/myevents", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        <center>Organizer Dashboard</center>
      </h2>
      <div className="dashboard-actions">
        <Link to="/create-event" className="dashboard-link">
          Create New Event
        </Link>
        <Link to="/manage-events" className="dashboard-link">
          Manage Events
        </Link>
      </div>
      <div className="dashboard-events">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
            </div>
          ))
        ) : (
          <center>
            <p>No events created yet.</p>
          </center>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboardPage;
