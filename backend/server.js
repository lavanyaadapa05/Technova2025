require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors({ 
    origin: "http://localhost:5173", 
    credentials: true, 
    methods: "GET,POST,PUT,DELETE" 
  }));

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
