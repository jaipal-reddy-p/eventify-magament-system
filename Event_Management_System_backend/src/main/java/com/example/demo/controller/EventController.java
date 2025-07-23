package com.example.demo.controller;

import com.example.demo.model.Event;
import com.example.demo.model.User;
import com.example.demo.service.EventService;
import com.example.demo.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * REST controller for managing event operations such as creation,
 * listing, filtering by organizer, and deletion.
 */
@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // Adjust for prod
public class EventController {

    @Autowired
    private EventService eventService;

    @Autowired
    private UserService userService;

    /**
     * ✅ ORGANIZER ONLY: Creates a new event.
     */
    @PostMapping
    @PreAuthorize("hasRole('ORGANIZER')") // Ensures user has ORGANIZER role from JWT
    public ResponseEntity<?> createEvent(@RequestBody Event event, Principal principal) {
        try {
            // ✅ 1. Extract email from JWT
            String email = principal.getName();
            System.out.println("🔐 Principal email from JWT: " + email);

            // ✅ 2. Fetch organizer from DB
            User organizer = userService.getUserByEmail(email);
            if (organizer == null) {
                System.out.println("❌ Organizer not found in DB for email: " + email);
                return ResponseEntity.badRequest().body("Invalid organizer: " + email);
            }

            // ✅ 3. Assign organizer to event
            event.setOrganizer(organizer);

            // ✅ 4. Save and return the created event
            Event created = eventService.createEvent(event);
            return ResponseEntity.ok(created);

        } catch (Exception e) {
            // 🛑 Catching and logging unexpected errors
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to create event. Reason: " + e.getMessage());
        }
    }

    /**
     * 🟢 Public: Get all events
     */
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    /**
     * 🔍 Public: Get events by organizer ID
     */
    @GetMapping("/organizer/{id}")
    public List<Event> getByOrganizer(@PathVariable Long id) {
        return eventService.getEventsByOrganizerId(id);
    }

    /**
     * ❌ ORGANIZER ONLY: Delete an event by ID
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ORGANIZER')")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok("Event deleted");
    }
}
