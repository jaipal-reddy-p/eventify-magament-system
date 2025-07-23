package com.example.demo.service;

import com.example.demo.model.Event;
import com.example.demo.model.Ticket;
import com.example.demo.repository.EventRepository;
import com.example.demo.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service layer that contains business logic for managing ticket operations:
 * - Booking
 * - Retrieving by user or event
 * - Cancellation
 */
@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepo;

    @Autowired
    private EventRepository eventRepo;

    /**
     * Books a new ticket by:
     * - Setting its status to "BOOKED"
     * - Attaching a valid Event object
     * - Saving it in the DB
     *
     * @param ticket Ticket with event.id and user.id populated
     * @return saved ticket
     */
    public Ticket bookTicket(Ticket ticket) {
        ticket.setStatus("BOOKED");

        // ✅ Ensure the Event is fully loaded from DB
        Long eventId = ticket.getEvent().getId();
        Optional<Event> optionalEvent = eventRepo.findById(eventId);
        if (optionalEvent.isEmpty()) {
            throw new IllegalArgumentException("Event not found with ID: " + eventId);
        }

        // ✅ Attach the managed Event object
        ticket.setEvent(optionalEvent.get());

        return ticketRepo.save(ticket);
    }

    public List<Ticket> getTicketsByUser(Long userId) {
        return ticketRepo.findByUserId(userId);
    }

    public List<Ticket> getTicketsByEvent(Long eventId) {
        return ticketRepo.findByEventId(eventId);
    }

    public void cancelTicket(Long ticketId) {
        ticketRepo.deleteById(ticketId);
    }
}
