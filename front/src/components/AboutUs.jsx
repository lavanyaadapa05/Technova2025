import React from "react";
import Navbar from "./navbar";
import { StarsBackground } from "./ui/stars-background";
import { ShootingStars } from "./ui/shooting-stars";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Background Effects */}
      <StarsBackground />
      <ShootingStars />
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-6 text-center relative mt-24">
        {/* Animated Title */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 animate-fadeIn"
        >
          Welcome to <span className="text-blue-400">Technova</span>
        </motion.h1>

        {/* Description Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-8 bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-xl p-8 md:p-12 w-full max-w-3xl"
        >
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            Technova is the annual tech fest of <span className="text-blue-400 font-semibold">Shri Vishnu Engineering College for Women, Bhimavaram</span>.
          </p>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
            A fusion of innovation, technology, and creativity, bringing together the brightest minds to shape the future.
          </p>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            <span className="text-pink-400 font-semibold">Join us</span> as we explore the limitless potential of technology and push the boundaries of innovation.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;
