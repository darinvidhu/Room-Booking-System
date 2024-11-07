const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    type: { type: String, required: true },
    price: { type: Number, required: true },
    booked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Room', roomSchema);
