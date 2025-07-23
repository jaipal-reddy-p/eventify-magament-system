package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * Entity representing a JWT token issued to a user.
 * Stores the token value, associated user, and its expiration time.
 */
@Entity
@Table(name = "jwt_tokens")
public class JWTToken {

    /**
     * Auto-generated primary key for each token entry.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tokenId;

    /**
     * User associated with the JWT token.
     * This establishes a many-to-one relationship with the User entity.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * The JWT token string (can be long).
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String token;

    /**
     * The date and time when the token expires.
     */
    @Column(nullable = false)
    private LocalDateTime expiresAt;

    // --- Constructors ---

    public JWTToken() {
        // Default constructor
    }

    public JWTToken(User user, String token, LocalDateTime expiresAt) {
        this.user = user;
        this.token = token;
        this.expiresAt = expiresAt;
    }

    // --- Getters and Setters ---

    public int getTokenId() {
        return tokenId;
    }

    public void setTokenId(int tokenId) {
        this.tokenId = tokenId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }

    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
}
