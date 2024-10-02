import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { CircularProgressbar } from "react-circular-progressbar";

const MAX_SECONDS = 3600;

const FloatingClock = () => {
  const [time, setTime] = useState<number>(MAX_SECONDS);
  const [position, setPosition] = useState({ x: 50, y: 500 });
  const draggingRef = useRef(false);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((t) => (t <= 0 ? MAX_SECONDS : t - 1));
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const onDrag = useCallback((e: MouseEvent) => {
    if (draggingRef.current) {
      setPosition({
        x: e.clientX - 32.5,
        y: e.clientY - 32.5,
      });
    }
  }, []);

  const startDrag = useCallback(() => {
    draggingRef.current = true;
    window.addEventListener("mousemove", onDrag);
    window.addEventListener("mouseup", stopDrag);
  }, [onDrag]);

  const stopDrag = useCallback(() => {
    draggingRef.current = false;
    window.removeEventListener("mousemove", onDrag);
    window.removeEventListener("mouseup", stopDrag);
  }, [onDrag]);

  const progress = useMemo(() => (time / MAX_SECONDS) * 100, [time]);

  return (
    <motion.div
      className="fixed cursor-grab w-[65px] h-[65px] flex items-center justify-center z-50 shadow rounded-full backdrop-blur border-primary-100 border border-dashed"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      onMouseDown={startDrag}
      whileHover={{ scale: 1.2 }}
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
