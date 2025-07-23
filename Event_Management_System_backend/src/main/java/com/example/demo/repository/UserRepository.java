package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * Repository interface for accessing user-related data.
 * Extends JpaRepository to provide basic CRUD operations.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by email (used for login, validation).
     *
     * @param email the email to search for
     * @return Optional containing User if found
     */
    Optional<User> findByEmail(String email);

    /**
     * Checks whether a user exists by email.
     *
     * @param email the email to check
     * @return true if user with email exists
     */
    boolean existsByEmail(String email);
}
