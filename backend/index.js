const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

// Routes import
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');

const app = express();

// ✅ CORS Configuration (slash hataya, OPTIONS add kiya)
app.use(cors({
    origin: [
        "http://localhost:5173", // Local development
        "https://notes-app-frontend-tawny.vercel.app" // Live frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_ATLAS_URI)
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// ✅ Default Route
app.get("/", (req, res) => {
    res.send("Notes API is running...");
});

// ✅ Start Server (for local dev)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
