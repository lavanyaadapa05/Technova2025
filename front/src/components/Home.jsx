import { motion } from "framer-motion";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Lottie from "lottie-react";
import animationData from "../Animation - 1740213740365 (1).json";
import { CardSpotlightDemo } from "./ui/stepscard";

export default function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-4 sm:px-6">
        
        {/* Main Content Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-lg mx-auto text-white space-y-6 md:space-y-0 md:space-x-12"
        >
          
          {/* Left Animation */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full flex justify-center"
          >
            <div className="w-64 sm:w-80 md:w-[400px] lg:w-[500px] xl:w-[600px]">
              <Lottie animationData={animationData} />
            </div>
          </motion.div>

          {/* High-End Register Button for Large Screens */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:flex flex-col items-start space-y-3"
          >
            <p className="text-gray-300 text-lg font-semibold tracking-wide">
              Secure your spot at <span className="text-blue-400">Technova 2025</span> today!
            </p>
            <button 
              onClick={() => navigate("/registration")}
              className="relative z-10 px-12 py-3 rounded-lg border-2 border-purple-500 text-white text-lg font-bold tracking-wide transition-all duration-300 bg-transparent shadow-[0_0_10px_rgba(128,0,128,0.5)] hover:shadow-[0_0_20px_rgba(128,0,128,0.8)] hover:border-purple-400"
            >
              Register Now 
            </button>
          </motion.div>

          {/* Middle Section with Invitation & Register Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-full max-w-2xl text-center md:text-left space-y-4 md:space-y-0 md:space-x-6 px-4 flex flex-col md:items-start"
          >
            {/* Event Description - Shown Only on Small Screens */}
            <p className="text-sm sm:text-base text-gray-300 w-full md:hidden">
              Join us at <span className="text-blue-400 font-semibold">Technova 2025</span> – A fusion of creativity, technology, and fun at SVECW, Bhimavaram!
            </p>

            {/* Register Button - Centered on Small Screens, Slightly Left on Large Screens */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center md:justify-start w-full md:w-auto lg:hidden"
            >
              <button 
                onClick={() => navigate("/registration")}
                className="relative z-10 px-10 py-3 ml-9 rounded-lg border border-white text-white transition duration-300 bg-transparent hover:bg-gray-700"
              >
                Register Here
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="w-full md:w-2/3 text-center md:text-left"
          >
            {/* Ensure card is properly aligned */}
            <div className="flex justify-center md:justify-end w-full">
              <CardSpotlightDemo />
            </div>

            {/* Background Effects */}
            <ShootingStars />
            <StarsBackground />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
