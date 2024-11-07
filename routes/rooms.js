const express = require('express');
const Room = require('../models/Room');
const router = express.Router();

// Example route for getting available rooms
router.get('/', async (req, res) => {
    try {
        const rooms = await Room.find({ booked: false });
        res.json(rooms); // Send the rooms data as JSON
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Booking a room
router.post('/book', async (req, res) => {
    const { roomType, name, phone } = req.body;

    try {
        const room = await Room.findOne({ type: roomType, booked: false });
        if (!room) return res.status(404).json({ message: 'Room not available' });

        room.booked = true;
        await room.save();
        res.status(200).json({ message: `Room booked successfully! Name: ${name}, Phone: ${phone}` });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
