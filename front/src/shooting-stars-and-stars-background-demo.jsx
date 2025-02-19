import { useNavigate } from "react-router-dom";
import { ShootingStars } from "./components/ui/shooting-stars";
import { StarsBackground } from "./components/ui/stars-background";
import CountdownTimer from "./components/countdown"; // Import CountdownTimer component

export default function ShootingStarsAndStarsBackgroundDemo() {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      {/* Full-Page Background Effects */}
      <div className="absolute inset-0 w-full h-full">
        <StarsBackground />
        <ShootingStars />
      </div>

      {/* Rectangular Notice Box - "Event Exclusive for Girls" */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-white px-8 py-3 rounded-lg shadow-lg text-lg font-semibold tracking-wide border border-fuchsia-300 animate-pulse">
         Exclusive Event for Girls
      </div>

      {/* Main Content Container */}
      <div className="relative flex flex-col items-center justify-center h-screen text-center">
        
        {/* Logo Image */}
        <img 
          src="/logo.png" 
          alt="Logo"
          className="w-50 h-40 mb-6" // Adjust width & height
        />
        
        {/* Register Button */}
        <button 
          className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-lg font-semibold leading-6 text-white inline-block"
          onClick={() => navigate("/register")}
        >
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-10 ring-1 ring-white/10">
            <span>Register Now</span>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>

        {/* Countdown Timer Component */}
        <CountdownTimer />

        {/* Decorative Heading */}
        <h2 className="relative z-10 text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-neutral-800 via-white to-white mt-4">
          <span></span>
        </h2>
      </div>
    </div>
  );
}