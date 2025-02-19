const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: { type: String, unique: true, required: true },
    email: { type: String, required: true, unique: true },
    college: { type: String, required: true },
    regdNo: { type: String, required: true },
    phone: { type: String, required: true },
    accommodation: { type: Boolean, default: false },
    eventsRegistered: [{ type: Number , ref: "Event" }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
