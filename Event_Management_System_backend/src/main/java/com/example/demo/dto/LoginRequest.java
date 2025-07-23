package com.example.demo.dto;

/**
 * DTO for handling login requests using email and password.
 * Normalizes email to ensure case-insensitive matching.
 */
public class LoginRequest {

    private String email;
    private String password;

    // --- Constructors ---

    public LoginRequest() {
        // No-args constructor for frameworks like Spring
    }

    public LoginRequest(String email, String password) {
        this.setEmail(email);
        this.password = password;
    }

    // --- Getters and Setters ---

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        // Normalize email to lowercase for consistent authentication
        this.email = (email != null) ? email.trim().toLowerCase() : null;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
