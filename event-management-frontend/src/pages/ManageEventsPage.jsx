import React, { useEffect, useState } from "react";

const ManageEventsPage = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    fetch("http://localhost:9090/api/organizer/myevents", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:9090/api/events/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (res.ok) {
        alert("Event deleted");
        fetchEvents(); // Refresh list
      } else {
        alert("Failed to delete");
      }
    } catch (err) {
      alert("Error occurred");
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">
        <center>Manage Events</center>
      </h2>
      <div className="dashboard-events">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <button
                onClick={() => handleDelete(event.id)}
                className="btn-delete"
              >
                Delete
              </button>
              {/* Add Edit logic if needed */}
            </div>
          ))
        ) : (
            <center>
              <p>No events found</p>
            </center>
        )}
      </div>
    </div>
  );
};

export default ManageEventsPage;