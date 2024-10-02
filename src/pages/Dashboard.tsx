import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import Animal1 from "/videos/video1.mp4";
import Animal2 from "/videos/video2.mp4";
import Animal3 from "/videos/video3.mp4";
import Animal4 from "/videos/video4.mp4";
import Animal5 from "/videos/video5.mp4";
import BCard from "../components/BCard/BCard";
import Gradient from "../lib/Gradient/Gradient";
import AnimatedNumber from "../components/AnimatedNumber";
import BResult from "../components/BResult/BResult";
import TrendGraph from "../components/TrendGraph/TrendGraph";

const generateSampleData = () => {
  const names = [
    "Whiskerwisp",
    "Flickerdoodle",
    "MystiPurr",
    "DandyPounce",
    "Puzzlebounce",
  ];
  const series = [];
  for (let i = 0; i < 5; i++) {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = `${String(hour).padStart(2, "0")}:00`;
      const value = Math.floor(Math.random() * 100);
      data.push({ primary: time, secondary: value });
    }
    series.push({ label: names[i], data });
  }
  return series;
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 },
  },
};

const CardBox = () => {
  return (
    <motion.div
      className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-5 w-full justify-items-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <BCard
          imgSrc={Animal1}
          title="Whiskerwisp"
          description="A soft, pastel-colored cat with swirling patterns of blue, pink, and lavender. Whiskerwisp's fur seems to shift slightly like mist, and their movements are almost too quiet to notice."
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <BCard
          imgSrc={Animal2}
          title="Flickerdoodle"
          description="A vibrant, orange-and-yellow striped cat with a coat that seems to flicker like a candle flame. They're always moving, darting around like a streak of sunlight."
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <BCard
          imgSrc={Animal3}
          title="MystiPurr"
          description="A rich, deep purple cat with flecks of silver and green like a midnight sky filled with shooting stars. Their eyes glow a soft, mysterious blue."
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <BCard
          imgSrc={Animal4}
          title="DandyPounce"
          description="A small, round, and fluffy cat with bright bursts of color—reds, yellows, and greens—like a bouquet of flowers. Their energy is boundless, and they seem to hop more than walk."
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <BCard
          imgSrc={Animal5}
          title="Puzzlebounce"
          description="A patchwork of colors—green, orange, blue, and pink—with each patch seemingly sewn together like a quilt. Puzzlebounce has mismatched eyes and an air of curiosity about everything."
        />
      </motion.div>
    </motion.div>
  );
};

const Dashboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient = new Gradient({
        canvas: canvasRef.current,
        colors: ["#370061", "#090B12", "#161A25", "#090B12"],
        amplitude: 320,
        density: [0.01, 0.16],
        angle: 0,
      });

      gradient.init();
    }
  }, []);

  return (
    <>
      <canvas
        className="w-screen h-screen fixed left-0 top-0 z-0"
        ref={canvasRef}
      />
      <div className="container flex flex-col items-center p-2 gap-5 m-auto overflow-x-clip justify-center">
        <div className="w-full flex flex-col gap-5 z-10 overflow-x-clip">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Prize Pool</h2>
            <AnimatedNumber
              target={99999999}
              tooltip="This is the current prize pool! Buy a ticket now for your chance to win big!"
              symbol="$"
              size="lg"
              className="permanent-marker-regular"
            />
          </div>
          <CardBox />
          <div className="rounded overflow-clip bg-background-200 shadow border border-background-100">
            <TrendGraph data={generateSampleData()} />
          </div>
          <BResult />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
