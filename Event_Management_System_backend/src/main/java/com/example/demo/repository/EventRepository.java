package com.example.demo.repository;

import com.example.demo.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository for accessing event data from the database.
 */
public interface EventRepository extends JpaRepository<Event, Long> {

    /**
     * Finds all events created by a specific organizer.
     *
     * @param id organizer's user ID
     * @return list of events
     */
    List<Event> findByOrganizerId(Long id);
}
