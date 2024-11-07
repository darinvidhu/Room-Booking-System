const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

router.post('/', async (req, res) => {
    const { roomId, name, phone, checkInDate, checkOutDate } = req.body;
    const booking = new Booking({ roomId, name, phone, checkInDate, checkOutDate });
    await booking.save();
    res.json({ message: 'Room booked successfully' });
});

module.exports = router;
