import { motion } from "framer-motion";

import AnimatedNumber from "../components/AnimatedNumber";
import BCard from "../components/BCard/BCard";
import BResult from "../components/BResult/BResult";
import GradientBackground from "../components/GradientBackground";
import Trend from "../components/Trend";
import { useAppContext } from "../hooks/useAppContext";
import { ANIMALS } from "../lib/constants";

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

  return (
    <motion.div
      className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full justify-items-center"
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
            vote={votes[animal.name]}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

const Dashboard = () => {
  return (
    <>
      <GradientBackground />
      <div className="container flex flex-col items-center p-2 gap-5 m-auto overflow-x-clip justify-center">
        <div className="w-full flex flex-col gap-5 z-10 overflow-x-clip">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">Prize Pool</h2>
            <AnimatedNumber
              target={0}
              tooltip="This is the current prize pool! Buy a ticket now for your chance to win big!"
              symbol="$"
              size="lg"
              className="permanent-marker-regular"
            />
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
