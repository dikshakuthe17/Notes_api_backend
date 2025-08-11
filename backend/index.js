const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

// Connect DB
// mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'));

// Connect DB
mongoose.connect(process.env.MONGO_ATLAS_URI).then(() => console.log('MongoDB connected successfully'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// Start server
app.listen(3000, () => {
    console.log('Server running on 3000');
});