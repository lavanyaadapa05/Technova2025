import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css"; // Import CSS for styling

const VideoIntro = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade-out effect
      setTimeout(() => {
        navigate("/technova"); // Navigate after fade-out
      }, 1000); // 1s fade duration
    }, 5000); // Adjust based on your video duration

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-black relative">
      <motion.div
        className={`video-container ${fadeOut ? "opacity-0" : "opacity-100"} transition-opacity duration-1000`}
      >
        <video autoPlay muted className="video">
          <source src="/intro2.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Black transparent overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
    </div>
  );
};

export default VideoIntro;
