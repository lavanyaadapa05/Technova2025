import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { TextGenerateEffect } from "./ui/text-generate";
import { useNavigate } from "react-router-dom";
import Navbar from './navbar';

export default function RegisterPage() {
  const words = `"Welcome to Technova – the ultimate hub of innovation, learning, and boundless possibilities! Experience the thrill of cutting-edge technology, exciting competitions, and groundbreaking ideas, all under one roof at SVECW, Bhimavaram. Are you ready to push the limits and make your mark?"`;
  const navigate = useNavigate();

  return (
    <div><Navbar />
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center px-6">
      
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-screen-lg mx-auto text-white space-y-6 md:space-y-0 md:space-x-12">
        
        {/* Left Image */}
        <img 
          src="/back.png" 
          alt="Event" 
          className="w-2/3 md:w-1/3 max-h-60 md:max-h-[600px] rounded-lg shadow-lg mx-auto md:mx-0"
        />
        {/* Right Content */}
        <div className="w-full md:w-2/3 px-4 text-center md:text-left">
          <TextGenerateEffect words={words} />
          <ShootingStars />
          <StarsBackground />
        </div>
        
      </div>
    </div>
    </div>
  );
}
