import { useNavigate } from "react-router-dom";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import CountdownTimer from "./components/countdown"; // Import CountdownTimer component
import { motion } from "framer-motion";
import './styles.css';
const TechnovaPage = () => {
  const navigate=useNavigate();
return (    
  <div className="bg-gradient-to-b from-gray-900 to-black">
      <div className="z-index:-1">
      <StarsBackground />
      <ShootingStars/> 
      </div>
      <div className="technova-page">
      {/* Title Animation */}
      <motion.h1
    initial={{ y: -100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    className="college-title text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-white font-bold text-center animate-pulse px-4"
    style={{
        fontFamily: "'italic', cursive",
        textShadow: "0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(255, 255, 255, 0.6)",
    }}
>
    SHRI VISHNU ENGINEERING COLLEGE FOR WOMEN
</motion.h1>

<motion.img
    src="/logo.png" // Change this to your actual image path
    alt="College"
    className="college-image w-3/4 sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-md mx-auto shadow-md animate-pulse"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    style={{
        filter: "drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))",
    }}
/>

      
      {/* Button Animation - Appears After Logo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <button
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-lg font-semibold leading-6 text-white inline-block"
          onClick={() => navigate("/register")}
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-10 ring-1 ring-white/10">
            <span>Dive In</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
      </motion.div>

      {/* TECHNOVA Text Animation */}
      <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="technova-text"
      >
          <CountdownTimer/>
      </motion.h1>
      </div>
  </div>
);
};

export default TechnovaPage;
