package com.example.demo.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

/**
 * Utility class for creating and validating JSON Web Tokens (JWT).
 * 
 * - Uses HMAC with SHA for token signing
 * - Token includes user email and role as claims
 */
@Component
public class JwtUtils {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expirationMs}")
    private long jwtExpirationMs;

    /**
     * Generates a secure HMAC signing key using the configured secret.
     *
     * @return signing Key
     */
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    /**
     * Generates a signed JWT token with user email and role.
     *
     * @param email user email to store as subject
     * @param role  user role (stored as claim)
     * @return signed JWT token string
     */
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * Extracts the email (username/subject) from a JWT token.
     *
     * @param token JWT token string
     * @return subject (email)
     */
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Extracts the user role from a JWT token.
     *
     * @param token JWT token string
     * @return role claim as String
     */
    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    /**
     * Validates the token by checking the signature and expiration.
     *
     * @param token JWT token string
     * @return true if token is valid, otherwise false
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token); // will throw if invalid
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
