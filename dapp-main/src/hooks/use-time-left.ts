import { useEffect, useState } from "react";

export default function useTimeLeft(time?: number) {
  const [timeLeft, setTimeLeft] = useState(time || 0);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    // Cleanup timer
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Convert remaining seconds to minutes and seconds format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return {
    timeLeft,
    setTimeLeft,
    formatTime,
  };
}
