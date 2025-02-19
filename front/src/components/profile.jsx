import React from "react";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import Navbar from './navbar';
const Profile = () => {
  // Dummy user data
  const user = {
    name: "Lavanya",
    email: "lavanya@example.com",
    college: "Shri Vishnu Engineering College for Women",
    branch: "Computer Science & Engineering",
    phone: "+91 98765 43210",
    comingFrom: "Andhra Pradesh",
  };

  return (
    <div>
        <Navbar/>
        <ShootingStars />
                        <StarsBackground />
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-6">
      <h1 className="text-5xl text-white mb-6" style={{ fontFamily: "'italic', cursive" }}>
        Profile
      </h1>

      {/* Profile Card */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-white">User Details</h2>
        <div className="mt-4">
          <p className="text-lg"><span className="font-semibold text-gray-300">Name:</span> {user.name}</p>
          <p className="text-lg"><span className="font-semibold text-gray-300">Email:</span> {user.email}</p>
          <p className="text-lg"><span className="font-semibold text-gray-300">College:</span> {user.college}</p>
          <p className="text-lg"><span className="font-semibold text-gray-300">Branch:</span> {user.branch}</p>
          <p className="text-lg"><span className="font-semibold text-gray-300">Phone:</span> {user.phone}</p>
          <p className="text-lg"><span className="font-semibold text-gray-300">Coming From:</span> {user.comingFrom}</p>
        </div>
      </div>

      {/* Passes Section */}
      <div className="mt-10 w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-center text-white">Passes</h2>
        <div className="flex flex-col gap-4 mt-4">
        <a
  href="/dummy-accommodation-pass.pdf"
  download
  className="relative block text-center px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gradient-to-r from-pink-500 hover:text-black hover:scale-105 z-10"
>
  Download Accommodation Pass
</a>

<a
  href="/dummy-entry-pass.pdf"
  download
  className="relative block text-center px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gradient-to-r  from-pink-500 hover:text-black hover:scale-105 z-10"
>
  Download Entry Pass
</a>

        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
