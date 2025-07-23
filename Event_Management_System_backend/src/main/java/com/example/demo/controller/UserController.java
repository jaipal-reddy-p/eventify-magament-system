package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.UserDTO;
import com.example.demo.jwt.JwtUtils;
import com.example.demo.model.User;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * REST controller for handling user authentication and registration.
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Change for production
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * Registers a new user or organizer.
     *
     * @param user User object from frontend (name, email, password, role)
     * @return ResponseEntity with success or error message
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        String response = userService.register(user);
        if (response.toLowerCase().contains("already")) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Logs in a user using email and password.
     * If authentication succeeds, returns user details and JWT token.
     *
     * @param loginRequest DTO containing email and password
     * @return ResponseEntity with user info and token or error message
     */
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        UserDTO user = userService.login(
                loginRequest.getEmail().toLowerCase().trim(),
                loginRequest.getPassword()
        );

        if (user == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtils.generateToken(user.getEmail(), user.getRole());

        // Build response map
        Map<String, Object> response = new HashMap<>();
        response.put("user", user);
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}
