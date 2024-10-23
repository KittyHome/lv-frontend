import { motion } from "framer-motion";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { IoPlaySkipBack, IoPlaySkipForward } from "react-icons/io5";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import { useGlobalAudioPlayer } from "react-use-audio-player";

import { useAppContext } from "../hooks/useAppContext";
import useOutsideClick from "../hooks/useOutsideClick";
import { DEFAULT_AUDIOS } from "../lib/constants";

const calculateConstraints = () => {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  return {
    top: 0,
    right: screenWidth - 65,
    bottom: screenHeight - 65,
    left: 0,
  };
};

const FloatingClock = () => {
  const [time, setTime] = useState<number>(0);
  const { stage } = useAppContext();
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setIsHovered(false));
  const [constraints, setConstraints] = useState(calculateConstraints());
  const [audioPlayIndex, setAudioPlayIndex] = useState(0);
  const { load, pause, play, playing } = useGlobalAudioPlayer();

  const clockTitle = useMemo(
    () =>
      `Game ends in ${String(Math.floor(time / 60)).padStart(2, "0")}m ${String(
        time % 60
      ).padStart(2, "0")}s`,
    [time]
  );

  const progress = useMemo(() => {
    if (!stage) return 0;
    const maxSeconds =
      (stage.endedAt.getTime() - stage.startedAt.getTime()) / 1000;
    return (time / maxSeconds) * 100;
  }, [time, stage]);

  const handleResize = () => {
    setConstraints(calculateConstraints());
  };

  const handleClick = useCallback(() => {
    playing ? pause() : play();
  }, [playing, play, pause]);

  const handleNext = useCallback(() => {
    setAudioPlayIndex((prvIndex) => (prvIndex + 1) % DEFAULT_AUDIOS.length);
  }, []);

  const handlePrevious = useCallback(() => {
    setAudioPlayIndex(
      (prvIndex) =>
        (DEFAULT_AUDIOS.length + prvIndex - 1) % DEFAULT_AUDIOS.length
    );
  }, []);

  useEffect(() => {
    const timerID = setInterval(() => {
      setTime((t) => (t <= 0 ? 0 : t - 1));
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  useEffect(() => {
    stage &&
      setTime(
        Math.floor((stage.endedAt.getTime() - new Date().getTime()) / 1000)
      );
  }, [stage]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    load(DEFAULT_AUDIOS[audioPlayIndex], {
      autoplay: true,
      onend: () =>
        setAudioPlayIndex((audioPlayIndex + 1) % DEFAULT_AUDIOS.length),
    });
  }, [load, audioPlayIndex]);

  return (
    <motion.div
      ref={ref}
      className="fixed cursor-grab h-[65px] flex items-center justify-start z-50 shadow rounded-full backdrop-blur left-0 top-0 bg-background-100/60 border border-white/10"
      animate={{
        width: isHovered ? 180 : 65,
      }}
      title={clockTitle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dragConstraints={constraints}
      drag
    >
      <div className="h-[65px] w-[65px] rounded-full flex items-center justify-center absolute z-50 border-2 border-primary-100/60 border-dotted">
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
      </div>
      <div className="flex-1 flex items-center justify-end pr-5">
        {isHovered && (
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="opacity-70"
              onClick={handlePrevious}
            >
              <IoPlaySkipBack />
            </motion.button>
            <motion.button
              className="text-3xl"
              whileHover={{ scale: 1.1 }}
              onClick={handleClick}
            >
              {playing ? <FaCirclePause /> : <FaCirclePlay />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="opacity-70"
              onClick={handleNext}
            >
              <IoPlaySkipForward />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FloatingClock;
