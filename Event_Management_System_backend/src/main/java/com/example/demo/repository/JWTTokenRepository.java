package com.example.demo.repository;

import com.example.demo.model.JWTToken;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import jakarta.transaction.Transactional;
import java.util.Optional;

/**
 * Repository for managing JWT tokens.
 * Provides methods to retrieve and delete tokens associated with users.
 */
@Repository
public interface JWTTokenRepository extends JpaRepository<JWTToken, Integer> {

    /**
     * Finds a token entity by the raw token string.
     *
     * @param token the JWT token string
     * @return optional JWTToken object
     */
    Optional<JWTToken> findByToken(String token);

    /**
     * Retrieves the token associated with a specific user ID.
     *
     * @param userId the user's ID
     * @return JWTToken object
     */
    @Query("SELECT t FROM JWTToken t WHERE t.user.id = :userId")
    JWTToken findByUserId(@Param("userId") Long userId);

    /**
     * Deletes all tokens associated with the given user ID using JPQL.
     *
     * @param userId the user's ID
     */
    @Modifying
    @Transactional
    @Query("DELETE FROM JWTToken t WHERE t.user.id = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    /**
     * Deletes token(s) by user ID (native method).
     *
     * @param userId the user's ID
     */
    void deleteByUserId(int userId); // This is a Spring Data method — optional if not used
}
