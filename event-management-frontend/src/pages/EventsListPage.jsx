import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const EventsListPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:9090/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const handleBook = (eventId) => {
    // Redirect to booking page or popup (to implement later)
    navigate(`/book/${eventId}`);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">
        <center>Available Events</center>
      </h1>
      <div className="event-grid">
        {events.length === 0 ? (
          <p>No events available.</p>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event.id}>
              <h2>{event.title}</h2>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>{event.description}</p>
              <button
                onClick={() => handleBook(event.id)}
                className="book-button"
              >
                Book Ticket
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsListPage;
