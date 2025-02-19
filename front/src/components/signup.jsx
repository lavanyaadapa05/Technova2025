import React, { useState } from "react";
import Navbar from "./navbar";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="relative bg-black text-white min-h-screen flex flex-col items-center justify-center px-6">
        <ShootingStars />
        <StarsBackground />

        <h1 className="text-5xl text-white mb-6" style={{ fontFamily: "'italic', cursive" }}>
          Create Your Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="relative z-10 mt-6 p-6 bg-gray-900 rounded-lg shadow-lg w-full max-w-md"
        >
          <label className="block mb-4">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </label>

          <label className="block mb-4">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </label>

          <label className="block mb-4">
            Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </label>

          <label className="block mb-4">
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 rounded-lg bg-gray-800 text-white border border-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gray-700"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account? <a href="/login" className="text-pink-500 hover:underline">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
