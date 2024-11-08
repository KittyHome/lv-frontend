import { useState, useEffect } from "react";

const useCountdown = (targetDate: Date | undefined | null) => {
  const [countdown, setCountdown] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const voteDisabledUntil = new Date(targetDate || 0);
      const secondsLeft = (voteDisabledUntil.getTime() - now.getTime()) / 1000;

      if (secondsLeft > 0) {
        setIsDisabled(true);
        setCountdown(`${Math.ceil(secondsLeft)} seconds`);
      } else {
        setIsDisabled(false);
        setCountdown("");
      }
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  return { countdown, isDisabled };
};

export default useCountdown;
