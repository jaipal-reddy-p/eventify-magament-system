package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing an OTP request for password reset.
 * Stores the OTP and timestamp associated with an email.
 */
@Entity
@Table(name = "otprequests")
public class Otprequests {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Email associated with the OTP request.
     * Must be unique to avoid duplicate requests.
     */
    @Column(nullable = false, unique = true)
    private String email;

    /**
     * 6-digit OTP code sent to the user's email.
     */
    @Column(nullable = false, length = 6)
    private String otp;

    /**
     * Timestamp when the OTP was created.
     */
    @Column(nullable = false)
    private LocalDateTime createdAt;

    // --- Constructors ---

    public Otprequests() {}

    public Otprequests(String email, String otp, LocalDateTime createdAt) {
        this.email = email.toLowerCase();
        this.otp = otp;
        this.createdAt = createdAt;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email.toLowerCase(); // Normalize input
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
