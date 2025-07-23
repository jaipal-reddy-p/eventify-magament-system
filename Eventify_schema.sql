-- Database: event_management_system
CREATE DATABASE IF NOT EXISTS event_management_system;
USE event_management_system;

-- USERS table
CREATE TABLE users (
  id BIGINT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  password VARCHAR(255),
  role VARCHAR(255),
  PRIMARY KEY (id)
);

-- EVENTS table
CREATE TABLE events (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255),
  description TEXT,
  date DATE,
  organizer_id BIGINT,
  PRIMARY KEY (id),
  FOREIGN KEY (organizer_id) REFERENCES users(id) ON DELETE CASCADE
);

-- TICKETS table
CREATE TABLE tickets (
  id BIGINT NOT NULL AUTO_INCREMENT,
  ticket_type VARCHAR(50),
  status VARCHAR(50),
  user_id BIGINT,
  event_id BIGINT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- JWT TOKENS table
CREATE TABLE jwt_tokens (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  token TEXT NOT NULL,
  user_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- OTP REQUESTS table
CREATE TABLE otprequests (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  otp VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);