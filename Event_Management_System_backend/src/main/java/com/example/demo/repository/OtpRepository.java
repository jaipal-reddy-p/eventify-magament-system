package com.example.demo.repository;

import com.example.demo.model.Otprequests;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.Optional;

/**
 * Repository interface for OTP request operations.
 * Provides methods to find, verify, and delete OTP entries by email or OTP code.
 */
@Repository
public interface OtpRepository extends JpaRepository<Otprequests, Long> {

    /**
     * Finds an OTP request by email.
     *
     * @param email the email address
     * @return optional OTP request
     */
    Optional<Otprequests> findByEmail(String email);

    /**
     * Finds an OTP request by OTP value.
     *
     * @param otp the OTP value
     * @return optional OTP request
     */
    Optional<Otprequests> findByOtp(String otp);

    /**
     * Deletes OTP entry by email.
     *
     * @param email the email address
     */
    @Modifying
    @Transactional
    void deleteByEmail(String email);

    /**
     * Checks if an OTP exists for the provided email.
     *
     * @param email the email address
     * @return true if exists, false otherwise
     */
    boolean existsByEmail(String email);
}
