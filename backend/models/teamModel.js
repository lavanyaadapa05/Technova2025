const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
    teamId: { type: String, unique: true, required: true },
    teamName: { type: String, required: true },
    Event_id: { type: Number, ref: "Event", required: true },
    leadName: { type: String, required: true },
    leadEmail: { type: String, required: true },
    leader_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    teamMates: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
            name: { type: String, required: true },
            email: { type: String, required: true },
            
        }
    ]
});

module.exports = mongoose.model("Team", TeamSchema);