import React, { useState, useEffect } from "react";
import axios from "axios";
import { StarsBackground } from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "./Events.css";

const BranchEventSelector = () => {
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [hoveredEvent, setHoveredEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("https://technovabackend-wwcs.onrender.com/api/events");
                const eventsData = response.data;

                console.log("Fetched Events Data:", eventsData); // Debugging log

                // Ensure each department contains an array of events
                const formattedBranches = Object.keys(eventsData).map((dept) => ({
                    name: dept,
                    events: Array.isArray(eventsData[dept]) ? eventsData[dept] : []
                }));

                console.log("Formatted:", formattedBranches); // Debugging log

                setBranches(formattedBranches);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching events:", error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black"> 
            <StarsBackground />
            <ShootingStars />
            <Navbar />
            

            <div className="flex justify-center items-center py-20">
                <h1 className="text-5xl text-white" >
                    Events
                </h1>
            </div>

            {loading ? (
                <div className="text-center text-white text-lg">Loading events...</div>
            ) : (
                <>
                    {/* Branch Buttons */}
                    <div className="flex flex-wrap justify-center gap-4 px-4 relative z-[50]">
                    {branches.map((branch) => (
    <button
        key={branch.name}
        onClick={() => {
            console.log("Selected Branch:", branch); // Debugging log
            setSelectedBranch(branch);
        }}
        className={`my-button cursor-pointer px-6 py-3 rounded-lg border border-white text-white transition duration-300 relative z-[50]${
            selectedBranch?.name === branch.name ? "bg-pink-500" : "bg-transparent hover:bg-gray-700"
        }`}
    >
        {branch.name}
    </button>
))}

                    </div>

                    {/* Event List */}
          {selectedBranch && (
    <div className="relative z-20 flex flex-wrap justify-center gap-6 mt-6 px-4">
        {console.log("Events for selected branch:", selectedBranch.events)} {/* Debugging log */}
        {selectedBranch.events.length > 0 ? (
            selectedBranch.events.map((event, index) => (
                <Link key={event.eventId || index} to={`/event/${event.eventId}`} className="z-30">
                <div
                     // ✅ Fix eventId
                    onMouseEnter={() => setHoveredEvent(event)}
                    onMouseLeave={() => setHoveredEvent(null)}
                    className="event-card p-5 border border-white rounded-lg bg-gray-900 text-center  w-60 cursor-pointer transition duration-300 hover:shadow-lg flex flex-col items-center"
                >
                    <span className="text-lg font-semibold text-white">
                        {event.name ? event.name : "Unnamed Event"}  {/* ✅ Fix name */}
                    </span>
                    {hoveredEvent === event && (
                        <div className="mt-2 text-sm text-pink-400">
                            {event.description ? event.description : "No description available"}  {/* ✅ Fix description */}
                        </div>
                    )}
                </div>
                </Link>
            ))
        ) : (
            <div className="text-center text-white text-lg mt-4">No events available</div>
        )}
    </div>
)}

                </>
            )}
        </div>
    );
};

export default BranchEventSelector;
