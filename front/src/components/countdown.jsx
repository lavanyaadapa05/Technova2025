import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const eventName = "";
  const eventDate = "2025-03-06T00:00:00"; // Adjust date as needed
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const eventTime = new Date(eventDate).getTime();
      let remainingTime = eventTime - currentTime;

      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdownInterval);
      }

      setTimeRemaining(remainingTime);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [eventDate]);

  const formatTime = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold">
        {[{ label: "Days", value: days },
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds }].map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center bg-gray-800 text-5xl font-bold rounded-md shadow-md transition-all duration-500 ease-in-out">
              {unit.value}
            </div>
            <span className="text-sm mt-2">{unit.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="relative z-10 text-center mt-10">
  <h3 className="text-2xl sm:text-2xl md:text-5xl lg:text-4xl  bg-gradient-to-r from-pink-400 via-white to-yellow-400 bg-clip-text text-transparent tracking-wide drop-shadow-lg mb-6">
    {eventName}
  </h3>
  {formatTime(timeRemaining)}
</div>


  );
};

export default CountdownTimer;
