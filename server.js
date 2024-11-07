const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const router = express.Router();


dotenv.config();

const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/rooms', roomRoutes);



mongoose.connect('mongodb://localhost:27017/room', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));
