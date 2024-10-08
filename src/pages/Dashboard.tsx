import { motion } from "framer-motion";

import AnimatedNumber from "../components/AnimatedNumber";
import BCard from "../components/BCard/BCard";
import BResult from "../components/BResult/BResult";
import GradientBackground from "../components/GradientBackground";
import Trend from "../components/Trend";
import { useAppContext } from "../hooks/useAppContext";
import { ANIMALS } from "../lib/constants";
import GoldBG from "/images/gold_bg.webp";
import Switch from "../common/Switch";
import { useMemo, useState } from "react";

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
  const { votes } = useAppContext();
  const [isSort, setIsSort] = useState(true);

  const sortedAnimals = useMemo(() => {
    return isSort
      ? [...ANIMALS].sort((a, b) => (votes[a.name] > votes[b.name] ? -1 : 1))
      : ANIMALS;
  }, [isSort, votes]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex gap-2 items-center bg-background-200 px-3 py-2 mb-2 rounded-lg w-fit border border-primary-200">
          Sort by rank
          <Switch checked={isSort} onChange={setIsSort} />
        </div>
      </div>
      <motion.div
        className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
      >
        {sortedAnimals.map((animal) => (
          <motion.div key={animal.name} variants={itemVariants} layout>
            <BCard
              imgSrc={animal.avatar}
              title={animal.name}
              description={animal.description}
              vote={votes[animal.name]}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const { prizePool } = useAppContext();

  return (
    <>
      <GradientBackground />
      <div className="container flex flex-col items-center p-2 gap-5 m-auto overflow-x-clip justify-center">
        <div className="w-full flex flex-col gap-5 z-10 overflow-x-clip">
          <div className="relative flex flex-col items-center">
            <h2 className="text-2xl font-bold select-none">Next Prize Pool</h2>
            <AnimatedNumber
              target={prizePool}
              tooltip="This is the current prize pool! Buy a ticket now for your chance to win big!"
              symbol="$"
              size="lg"
              className="nabla-regular relative z-10"
            />
            <motion.div
              className="absolute -top-[60px] opacity-20 blur-sm z-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <img className="w-[250px]" src={GoldBG} alt="Gold Background" />
            </motion.div>
          </div>
          <CardBox />
          <Trend />
          <BResult />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
