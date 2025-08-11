const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173", // local dev
        "https://notes-app-frontend-tawny.vercel.app" // live frontend (slash hataya)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // OPTIONS added
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

app.get("/", (req, res) => {
    res.send("Notes API is running...");
});


// Start server
app.listen(3000, () => {
    console.log('Server running on 3000');
});