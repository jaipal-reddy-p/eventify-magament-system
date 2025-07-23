import React from "react";
import { Link } from "react-router-dom";
import "../assets/style.css";
<script
  src="https://kit.fontawesome.com/040a337d2d.js"
  crossorigin="anonymous"
></script>;

function HomePage() {
  return (
    <div className="home-wrapper">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="logo-icon">🎉</span>
          <h1 className="logo-text">Eventify</h1>
        </div>
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="home-header">
        <h2>Welcome to Eventify</h2>
        <p>Discover, Book, and Manage Events Seamlessly</p>
        <Link to="/events" className="home-button">
          Explore Events
        </Link>
      </header>

      {/* Features Section */}
      <main className="home-content">
        <h3 className="section-title">Why Choose Eventify?</h3>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="feature-icon">🔍</span>
            <h4>Discover Events</h4>
            <p>
              Browse a wide range of events tailored to your interests and
              location.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📝</span>
            <h4>Easy Booking</h4>
            <p>
              Register and book tickets effortlessly with our user-friendly
              platform.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📅</span>
            <h4>Manage Bookings</h4>
            <p>Keep track of your bookings and upcoming events in one place.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="social-icons">
          <a href="#">✉️</a>
          <a href="#">🌐</a>
        </div>
        <div>
          &copy; {new Date().getFullYear()} Eventify. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomePage;