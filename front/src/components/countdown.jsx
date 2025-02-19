import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const eventName = "Technova 2025";
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
      <div className="flex items-center justify-center gap-4 text-white text-2xl font-semibold bg-gray-1000 p-4 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">{days}</span>
          <span className="text-sm">Days</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">{hours}</span>
          <span className="text-sm">Hours</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">{minutes}</span>
          <span className="text-sm">Minutes</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span className="text-4xl font-bold">{seconds}</span>
          <span className="text-sm">Seconds</span>
        </div>
      </div>
    );
  };

  return (
    <div className="relative z-10 text-3xl md:text-5xl font-medium text-transparent bg-clip-text bg-gradient-to-b from-neutral-450 via-white to-white mt-4">
      <h3 className="text-7xl font-bold mb-4">{eventName}</h3>
      {formatTime(timeRemaining)}
    </div>
  );
};

export default CountdownTimer;
