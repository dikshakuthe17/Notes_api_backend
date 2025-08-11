const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose"); // Ensure mongoose is imported
const authRoutes = require("./routes/auth"); // Ensure routes are imported
const notesRoutes = require("./routes/notes"); // Ensure routes are imported
const app = express();

// Allowlist for frontend URLs
const allowedOrigins = [
    "http://localhost:3000", // local dev
    "https://notes-app-frontend-tawny.vercel.app" // production
];

// Dynamic CORS config
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests from allowed origins or no origin (e.g., Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true // Allow cookies and credentials
}));

// JSON parsing
app.use(express.json());

// Example route
app.get("/", (req, res) => {
    res.send("API is running...");
});

// ✅ Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

// ✅ Start Server (for local dev)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});