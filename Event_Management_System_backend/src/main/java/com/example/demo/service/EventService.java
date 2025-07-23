package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class that encapsulates all business logic for managing events.
 * Responsibilities include:
 * - Creating events
 * - Retrieving events (all / by organizer / by ID)
 * - Deleting events
 */
@Service
public class EventService {

    @Autowired
    private EventRepository eventRepo;

    /**
     * Creates and saves a new event to the database.
     *
     * @param event Event object containing event details
     * @return The saved Event object
     */
    public Event createEvent(Event event) {
        if (event.getOrganizer() == null) {
            throw new IllegalArgumentException("Organizer must not be null when creating an event.");
        }
        return eventRepo.save(event);
    }

    /**
     * Retrieves a list of all events from the database.
     *
     * @return List of all events
     */
    public List<Event> getAllEvents() {
        return eventRepo.findAll();
    }

    /**
     * Retrieves all events created by a specific organizer.
     *
     * @param organizerId The ID of the organizer
     * @return List of events associated with the given organizer
     */
    public List<Event> getEventsByOrganizerId(Long organizerId) {
        return eventRepo.findByOrganizerId(organizerId);
    }

    /**
     * Retrieves a single event by its unique ID.
     *
     * @param id ID of the event
     * @return Event object if found, else null
     */
    public Event getEventById(Long id) {
        return eventRepo.findById(id).orElse(null);
    }

    /**
     * Deletes an event by its ID.
     *
     * @param id ID of the event to be deleted
     */
    public void deleteEvent(Long id) {
        eventRepo.deleteById(id);
    }
}
