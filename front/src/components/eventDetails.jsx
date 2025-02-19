// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import EventRegistrationForm from "./EventRegistrationForm";
// import { StarsBackground } from "./ui/stars-background";
// import { ShootingStars } from "./ui/shooting-stars";
// import { useNavigate } from "react-router-dom";

// import Navbar from "./navbar";

// const EventDetail = () => {
//     const { eventId } = useParams();
//     const [event, setEvent] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchEvent = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
//                 setEvent(response.data);
//                 console.log(response.data);
//             } catch (error) {
//                 console.error("Error fetching event details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchEvent();
//     }, [eventId]);

//     if (loading) return <div className="text-center text-white">Loading event details...</div>;

//     if (!event) return <div className="text-center text-white">Event not found</div>;

//     return (
//         <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
//             <StarsBackground />
//             <ShootingStars />
//             <Navbar />

//             {/* Content Container */}
//             <div className="flex flex-col items-center justify-center px-6 text-center relative mt-24">
//                 {/* Animated Event Name */}
//                 <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 animate-fadeIn">
//                     {event.Name}
//                 </h1>

//                 {/* Event Description */}
//                 <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl animate-fadeIn delay-200">
//                     {event.Desc}
//                 </p>
//                 <div className="p-6">
//   <h2 className="text-2xl font-bold mb-4"></h2>

//   {/* Ensure event exists before checking Max_participants */}
//   {event && event.Max_participants > 1 && (
//     <div className="p-6 bg-gray-900 border border-blue-500 rounded-lg shadow-lg relative">
//       {/* Glowing effect */}
//       <div className="absolute inset-0 bg-blue-500 opacity-20 blur-lg rounded-lg"></div>

//       <p className="text-lg text-gray-200 relative">
//         If you are already enrolled in this event  and want to update your team (add or remove members), update your details here:
//       </p>
//       <button
//         onClick={() => navigate(`/update-team/${eventId}`)}
//         className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-blue-500 transition duration-300 relative"
//       >
//         Update Team
//       </button>
//     </div>
//   )}
// </div>


                

//                 {/* Registration Form */}
//                 <div className="w-full max-w-lg animate-fadeIn delay-400">
//                     <EventRegistrationForm eventId={event.Event_id} isSingleParticipant={event.Max_participants == 1} Max_participants={event.Max_participants} />
//                 </div>
                
//             </div>

            
//             {/* Smooth Scrolling Effect */}
//             <style>
//                 {`
//                     html {
//                         scroll-behavior: smooth;
//                     }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default EventDetail;
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import EventRegistrationForm from "./EventRegistrationForm";
import { StarsBackground } from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";

const EventDetail = () => {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${eventId}`);
                setEvent(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching event details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    if (loading) return <div className="text-center text-white">Loading event details...</div>;

    if (!event) return <div className="text-center text-white">Event not found</div>;

    return (
        <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-x-hidden">
            <StarsBackground />
            <ShootingStars />
            <Navbar />

            {/* Content Container */}
            <div className="flex flex-col items-center justify-center px-6 text-center relative mt-24">
                {/* Animated Event Name */}
                <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 animate-fadeIn">
                    {event.Name}
                </h1>

                {/* Event Description */}
                <p className="mt-6 text-xl text-gray-300 leading-relaxed max-w-2xl animate-fadeIn delay-200">
                    {event.Desc}
                </p>

                {/* Conditional block for team update (no extra spacing when not rendered) */}
                {event.Max_participants > 1 && (
                    <div className="p-6 bg-gray-900 border border-blue-500 rounded-lg shadow-lg relative mt-4">
                        {/* Glowing effect */}
                        <div className="absolute inset-0 bg-blue-500 opacity-20 blur-lg rounded-lg"></div>

                        <p className="text-lg text-gray-200 relative">
                            If you are already enrolled in this event and want to update your team (add or remove members), update your details here:
                        </p>
                        <button
                            onClick={() => navigate(`/update-team/${eventId}`)}
                            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 hover:shadow-blue-500 transition duration-300 relative"
                        >
                            Update Team
                        </button>
                    </div>
                )}

                {/* Registration Form */}
                <div className="w-full max-w-lg animate-fadeIn delay-400 mt-4">
                    <EventRegistrationForm eventId={event.Event_id} isSingleParticipant={event.Max_participants === 1} Max_participants={event.Max_participants} />
                </div>
            </div>

            {/* Smooth Scrolling Effect */}
            <style>
                {`
                    html {
                        scroll-behavior: smooth;
                    }
                `}
            </style>
        </div>
    );
};

export default EventDetail;
