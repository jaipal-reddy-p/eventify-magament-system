package com.example.demo.service;

import com.example.demo.dto.UserDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class that handles all user-related operations:
 * - Registration (with encryption and role assignment)
 * - Login validation
 * - Fetching user data by email
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Registers a new user (either USER or ORGANIZER).
     * - Validates if email already exists.
     * - Assigns default role USER if role is not provided.
     * - Encrypts password using BCrypt.
     *
     * @param user The user entity to register
     * @return A status message indicating the result
     */
    public String register(User user) {
        // ✅ Check if email is already registered
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists";
        }

        // ✅ Set role to USER if not provided
        if (user.getRole() == null || user.getRole().isBlank()) {
            user.setRole("USER");
        }

        // ✅ Encrypt the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // ✅ Save user to database
        userRepo.save(user);
        return "User registered successfully";
    }

    /**
     * Authenticates a user using email and password.
     * - Fetches user by email
     * - Verifies raw password against hashed password
     *
     * @param email    User's login email
     * @param password Raw password from login form
     * @return UserDTO if authentication is successful, otherwise null
     */
    public UserDTO login(String email, String password) {
        Optional<User> optionalUser = userRepo.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            // ✅ Match input password with stored hashed password
            if (passwordEncoder.matches(password, user.getPassword())) {
                return new UserDTO(user.getId(), user.getName(), user.getEmail(), user.getRole());
            }
        }

        return null;
    }

    /**
     * Retrieves a user entity by their email.
     *
     * @param email Email address to search
     * @return User entity if found, otherwise null
     */
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }
}
