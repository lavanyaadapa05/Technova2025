import { useState } from "react";

const EventRegistrationForm = ({ eventId, isSingleParticipant, Max_Participants }) => {
  const [teamName, setTeamName] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [leaderEmail, setLeaderEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [message, setMessage] = useState("");
  console.log(typeof(eventId));
  const spotEvents = [1, 2, 3, 4, 5, 27]; // List of spot registration event IDs
  const isSpotEvent = spotEvents.includes(eventId); // Check if eventId is in spotEvents

  const addMember = () => {
    if (members.length >= Max_Participants) {
      alert(`Maximum ${Max_Participants} members allowed!`);
      return;
    }
    setMembers([...members, { name: "", email: "" }]);
  };

  const removeMember = (index) => {
    setMembers(members.filter((_, i) => i !== index));
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teamData = isSingleParticipant
      ? { EventId: eventId, leadName: leaderName, leadEmail: leaderEmail }
      : { 
          EventId: eventId, 
          teamId: "", // Generated on backend
          teamName, 
          leadName: leaderName, 
          leadEmail: leaderEmail, 
          teamMates: members.map(member => ({ name: member.name, email: member.email })) 
        };

    console.log(teamData);

    try {
      const response = await fetch("https://technovabackend-wwcs.onrender.com/api/create-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teamData),
      });
      
      const data = await response.json();
      console.log(data);
      
      if (data.message.includes("Users not found")) {
        const missingUsers = data.message.split(": ")[1];
        setMessage(
          <>
            <span>{missingUsers} is not registered on our website. </span>
            <a href="/registration" style={{ color: "blue", textDecoration: "underline" }}>
              Click here to register.
            </a>
          </>
        );
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("Registration failed. Try again!");
    }
  };

  return (
    <div className="relative text-white min-h-screen flex flex-col items-center justify-center px-6">
      {/* Check if the event is a spot event */}
      {isSpotEvent ? (
        <div className="relative z-10 mt-6 bg-red-900 p-4 rounded-lg shadow-lg w-full max-w-md border border-red-500 text-center">
          <p className="text-white text-lg font-semibold">
            ⚠️ This is a <span className="text-yellow-300">Spot Registration Event</span>. 
            Registrations will only take place on the spot.
          </p>
        </div>
      ) : (
        <>
          {/* Important Notice */}
          <div className="relative z-10 mt-6 bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-md border border-pink-500">
            <p className="text-white text-sm text-center font-semibold">
              ⚠️ <span className="text-pink-400">Important:</span>Every individual must register on our website before enrolling in any event. </p>
          </div>

          {/* Registration Form */}
          <div className="relative z-10 mt-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold text-center mb-6 text-white">
              {isSingleParticipant ? "Event Registration" : "Team Registration"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isSingleParticipant && (
                <>
                  <h3 className="text-lg font-medium text-white">Team Details</h3>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" 
                    placeholder="Team Name" 
                    value={teamName} 
                    onChange={(e) => setTeamName(e.target.value)} 
                    required 
                  />
                </>
              )}

              <h3 className="text-lg font-medium text-white">
                {isSingleParticipant ? "Participant Details" : "Team Leader Details"}
              </h3>
              <input 
                type="text" 
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" 
                placeholder="Name" 
                value={leaderName} 
                onChange={(e) => setLeaderName(e.target.value)} 
                required 
              />
              <input 
                type="email" 
                className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" 
                placeholder="Email" 
                value={leaderEmail} 
                onChange={(e) => setLeaderEmail(e.target.value)} 
                required 
              />

              {!isSingleParticipant && (
                <>
                  <h3 className="text-lg font-medium text-white">Team Members</h3>
                  {members.map((member, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        className="w-1/2 px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" 
                        placeholder="Member Name" 
                        value={member.name} 
                        onChange={(e) => handleMemberChange(index, "name", e.target.value)} 
                        required 
                      />
                      <input 
                        type="email" 
                        className="w-1/2 px-3 py-2 rounded-lg bg-gray-800 text-white border border-white focus:ring-2 focus:ring-pink-500" 
                        placeholder="Member Email" 
                        value={member.email} 
                        onChange={(e) => handleMemberChange(index, "email", e.target.value)} 
                        required 
                      />
                      <button type="button" className="text-red-500" onClick={() => removeMember(index)}>❌</button>
                    </div>
                  ))}
                  <button type="button" className="w-full px-3 py-2 rounded-lg bg-blue-500 text-white" onClick={addMember}>+ Add Member</button>
                </>
              )}
              
              <button type="submit" className="w-full px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gray-700">
                Enroll
              </button>
              
            </form>
           
          </div>
        </>
      )}

      {/* Custom Alert Box */}
      {message && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg border border-blue-500 max-w-md w-full">
            <p className="text-center">{message}</p>
            <button onClick={() => setMessage("")} className="mt-4 w-full bg-gray-700 py-2 rounded-lg border border-white hover:bg-gray-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventRegistrationForm;
