require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
const cors = require("cors");

app.use(
    cors({
        origin: ["http://localhost:5173", "https://technova-b7qy.onrender.com"], // ✅ Add your deployed frontend URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Connect to MongoDB
connectDB();

// Import routes
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const teamRoutes = require("./routes/teamRoutes");
// Use Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api", teamRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
