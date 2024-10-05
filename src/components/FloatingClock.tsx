import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

import { fetchNextGameTime } from "../lib/firebase/utils";

const MAX_SECONDS = 3600;

const FloatingClock = () => {
  const [time, setTime] = useState<number>(MAX_SECONDS);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((t) => (t <= 0 ? MAX_SECONDS : t - 1));
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    fetchNextGameTime().then((newDate?: Date) => {
      if (newDate) {
        setTime(Math.floor((newDate.getTime() - new Date().getTime()) / 1000));
      }
    });
  }, []);

  const progress = useMemo(() => (time / MAX_SECONDS) * 100, [time]);

  const screenConstraints = useMemo(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return {
      top: 0,
      right: screenWidth - 65,
      bottom: screenHeight - 65,
      left: 0,
    };
  }, []);

  return (
    <motion.div
      className="fixed cursor-grab w-[65px] h-[65px] flex items-center justify-center z-50 shadow rounded-full backdrop-blur border-primary-100 border border-dashed left-0 top-0"
      drag
      dragConstraints={screenConstraints}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      title={`Game ends in ${String(Math.floor(time / 60)).padStart(
        2,
        "0"
      )}m ${String(time % 60).padStart(2, "0")}s`}
    >
      <CircularProgressbar
        className="pointer-events-none"
        value={progress}
        text={`${String(Math.floor(time / 60)).padStart(2, "0")}:${String(
          time % 60
        ).padStart(2, "0")}`}
        counterClockwise
        background
        backgroundPadding={3}
        styles={{
          background: {
            fill: "var(--color-background-100)",
            opacity: 0.5,
          },
          text: {
            fontWeight: "bold",
            fill: "var(--color-primary-100)",
            fontSize: 25,
            userSelect: "none",
          },
          trail: {
            stroke: "var(--color-text-100)",
            strokeWidth: "0",
          },
          path: {
            stroke: "var(--color-primary-100)",
          },
        }}
      />
    </motion.div>
  );
};

export default FloatingClock;
