import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import BCard from "../components/BCard/BCard";
import Gradient from "../lib/Gradient/Gradient";
import AnimatedNumber from "../components/AnimatedNumber";
import BResult from "../components/BResult/BResult";
import TrendGraph from "../components/TrendGraph/TrendGraph";
import { ANIMALS } from "../lib/constants";

const generateSampleData = () => {
  const series: any[] = [];
  ANIMALS.forEach((animal) => {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = `${String(hour).padStart(2, "0")}:00`;
      const value = Math.floor(Math.random() * 100);
      data.push({ primary: time, secondary: value });
    }
    series.push({ label: animal.name, data });
  });
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
      {ANIMALS.map((animal) => (
        <motion.div key={animal.name} variants={itemVariants}>
          <BCard
            imgSrc={animal.avatar}
            title={animal.name}
            description={animal.description}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

const Dashboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const gradient = new Gradient({
        canvas: canvasRef.current,
        colors: ["#171625", "#090B12", "#161A25", "#090B12"],
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
