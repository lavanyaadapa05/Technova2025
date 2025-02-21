
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");  // ✅ Import path
const connectDB = require("./config/db");

const app = express();
app.use(express.json());


app.use(
    cors({
        origin: [process.env.FRONTEND_URL,"http://localhost:5173"], // ✅ Add your deployed frontend URL
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
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("Server is running...");
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
