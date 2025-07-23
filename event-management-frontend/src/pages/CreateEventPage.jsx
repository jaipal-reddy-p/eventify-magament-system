import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/style.css";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:9090/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(eventData),
      });

      if (res.ok) {
        alert("Event created successfully");
        navigate("/organizer/dashboard");
      } else {
        alert("Failed to create event");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error creating event");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create New Event</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <input
          type="text"
          name="title"
          placeholder="Event Title"
          value={eventData.title}
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Event Description"
          value={eventData.description}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="date"
          name="date"
          value={eventData.date}
          onChange={handleChange}
          required
          className="form-input"
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={eventData.location}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="form-button">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEventPage;
