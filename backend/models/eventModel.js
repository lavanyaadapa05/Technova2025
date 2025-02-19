const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    Event_id: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Desc: { type: String },
    Max_participants: { type: Number, required: true },
    Dept: { type: String, required: true },
    Teams: { type: [String], default: [] }, // Array of registered teams (if needed)
}, {
    collection: "Events", // Specify the exact collection name
  });

const Event = mongoose.model("Events", eventSchema);

module.exports = Event;
