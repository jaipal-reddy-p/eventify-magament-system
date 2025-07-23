package com.example.demo.repository;

import com.example.demo.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository interface for Ticket entities.
 * Provides methods to query tickets by user ID and event ID.
 */
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    /**
     * Retrieves all tickets booked by a specific user.
     *
     * @param userId the ID of the user
     * @return list of Ticket objects
     */
    List<Ticket> findByUserId(Long userId);

    /**
     * Retrieves all tickets associated with a specific event.
     *
     * @param eventId the ID of the event
     * @return list of Ticket objects
     */
    List<Ticket> findByEventId(Long eventId);
}
