const express = require("express");
const Event = require("../models/eventModel");

const router = express.Router();
router.get("/:eventId", async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId, 10); // Convert to integer
        if (isNaN(eventId)) return res.status(400).json({ message: "Invalid event ID" });

        const event = await Event.findOne({ Event_id: eventId }); // Query with an integer
        if (!event) return res.status(404).json({ message: "Event not found" });

        res.json(event);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();

        // Group events by Dept
        const groupedEvents = {};
        events.forEach(event => {
            if (!groupedEvents[event.Dept]) {
                groupedEvents[event.Dept] = [];
            }
            groupedEvents[event.Dept].push({ 
                name: event.Name,
                eventId: event.Event_id, // Include event ID for frontend navigation
                description: event.Desc,
                maxParticipants: event.Max_participants
            });
        });

        res.status(200).json(groupedEvents);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Error fetching events" });
    }
});


router.post("/add-event", async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        await newEvent.save();
        res.status(201).json({ message: "Event created", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Error creating event", error });
    }
});



module.exports = router;
