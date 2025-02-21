import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import Navbar from "./navbar";

const UpdateTeam = () => {
  const { eventId } = useParams();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [team, setTeam] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", email: "", userId: "" });
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    showToast("Sending OTP...", "success");
    try {
      const response = await fetch("https://technovabackend-wwcs.onrender.com/api/users/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Fix key here
      });
      const data = await response.json();
      if (response.ok) {
        showToast("OTP sent successfully!", "success");
        setOtpSent(true);
      } else {
        showToast(data.message || "Error sending OTP.", "error");
      }
    } catch (error) {
      showToast("Failed to send OTP. Try again.", "error");
    }
};
const fetchTeamDetails = async () => {
    try {
        const response = await fetch(`https://technovabackend-wwcs.onrender.com/api/${eventId}/${email}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setTeam(data.team);
          console.log(data.team);
      } else {
          showToast(data.message || "Team not found.", "error");
          setTimeout(() => navigate(`/eventdetails/${eventId}`), 2000); // Redirect after showing toast
      }
    } catch (error) {
        console.error("Error fetching team details:", error);
        showToast("Error fetching team details.", "error");
    }
};


const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
        showToast("Email and OTP are required.", "error");
        return;
    }

    const sanitizedEmail = email.trim().toLowerCase();
    const requestBody = { leaderEmail: sanitizedEmail, otp: String(otp) };

    console.log("Verifying OTP request:", requestBody);

    try {
        const response = await fetch("https://technovabackend-wwcs.onrender.com/api/users/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email,otp}),
        });

        const data = await response.json();
        console.log("Response received:", response.status, data);

        if (response.ok) {
            showToast("OTP verified successfully!", "success");
            setOtpSent(false);

            // ✅ Fetch team details after OTP verification
            fetchTeamDetails();
        } else {
            showToast(data.message || "OTP verification failed.", "error");
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        showToast("OTP verification failed. Please try again.", "error");
    }
};



const handleAddMember = async () => {
    try {
      const payload = {
        eventId,
        leaderEmail: email,
        newMemberEmail: newMember.email,
        newMemberName: newMember.name
      };
  
      console.log("Sending data:", payload);
  
      const response = await fetch("https://technovabackend-wwcs.onrender.com/api/add-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        showToast("Member added successfully!", "success");
        if (data.team && Array.isArray(data.team.teamMates)) {
          setTeam(data.team);
        }
        setNewMember({ name: "", email: "", userId: "" });
      } else {
        showToast(data.message, "error");
      }
    } catch (error) {
      showToast("Error adding member.", "error");
    }
  };
  

  const handleRemoveMember = async (memberEmail) => {
    try {
      const response = await fetch("https://technovabackend-wwcs.onrender.com/api/remove-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, leaderEmail: email, memberEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        showToast("Member removed successfully!", "success");
        // Ensure updated team structure is set
        if (data.team && Array.isArray(data.team.teamMates)) {
            setTeam(data.team);
          }
        } else {
          showToast(data.message, "error");
        }
    } catch (error) {
      showToast("Error removing member.", "error");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-6">
        <div className="absolute inset-0 z-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        {toast && (
          <div className={`fixed left-1/2 transform -translate-x-1/2 p-4 rounded-lg text-white ${toast.type === "success" ? "bg-green-600" : "bg-red-600"} transition-opacity duration-300 shadow-lg z-50`} style={{ top: "4.5rem" }}>
            {toast.message}
          </div>
        )}
        <div className="relative z-10 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md">
        {!team ? (
  <form onSubmit={otpSent ? handleOtpSubmit : handleEmailSubmit}>
    <h2 className="text-2xl font-bold text-center mb-4 text-white">
      {otpSent ? "Enter OTP" : "Verify Email"}
    </h2>
    <input
      type={otpSent ? "text" : "email"}
      placeholder={otpSent ? "Enter OTP" : "Enter leader's email"}
      value={otpSent ? otp : email}
      onChange={(e) => otpSent ? setOtp(e.target.value) : setEmail(e.target.value)}
      required
      className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white"
    />
    <button
      type="submit"
      className="w-full px-6 py-3 rounded-lg border border-white text-white bg-transparent hover:bg-gray-700 mt-4 cursor-pointer"
    >
      {otpSent ? "Verify OTP" : "Send OTP"}
    </button>
  </form>
) : (
  <div>
    <h2 className="text-2xl font-bold text-center mb-4 text-white">Manage Team</h2>
    
    {/* Team List */}
    <ul className="text-white mb-4">
      {team.teamMates && team.teamMates.length > 0 ? (
        team.teamMates.map((member, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-800 p-2 rounded-lg my-2">
            {member.name} ({member.email})
            <button
              onClick={() => handleRemoveMember(member.email)}
              className="bg-red-600 text-white px-2 py-1 rounded-md ml-2"
            >
              Remove
            </button>
          </li>
        ))
      ) : (
        <p className="text-gray-400 text-center">No team members yet.</p>
      )}
    </ul>

    {/* Add Member Input Fields */}
    <div className="flex flex-col space-y-2">
      <input
        type="text"
        placeholder="Member Name"
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
        className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white"
      />
      <input
        type="email"
        placeholder="Member Email"
        value={newMember.email}
        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
        className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white border border-white"
      />
      <button
        onClick={handleAddMember}
        className="w-full bg-green-500 text-white py-2 rounded-lg cursor-pointer hover:bg-green-700"
      >
        Add Member
      </button>
    </div>
  </div>
)}

          
        </div>
      </div>
    </div>
  );
};

export default UpdateTeam;
