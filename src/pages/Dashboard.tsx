import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import Switch from "../common/Switch";
import AnimatedNumber from "../components/AnimatedNumber";
import BCard from "../components/BCard/BCard";
import GradientBackground from "../components/GradientBackground";
import VoteBox from "../components/VoteBox";
import { useAppContext } from "../hooks/useAppContext";
import GoldBG from "/images/gold_bg.webp";

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
  const { animals, selectedAnimal, setSelectedAnimal } = useAppContext();
  const [isSort, setIsSort] = useState(true);

  const sortedAnimals = useMemo(() => {
    return isSort
      ? [...animals].sort((a, b) => (a.vote > b.vote ? -1 : 1))
      : animals;
  }, [isSort, animals]);

  return (
    <div>
      <div className="flex justify-center -mt-3">
        <div className="flex gap-2 items-center bg-background-200/50 backdrop-blur px-3 py-2 mb-2 rounded-lg w-fit border-dashed border border-primary-200/30">
          Sort by rank
          <Switch checked={isSort} onChange={setIsSort} />
        </div>
      </div>
      <motion.div
        className="grid md:gap-2 gap-0 grid-cols-5 w-full justify-items-center"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
      >
        {sortedAnimals.map((animal) => (
          <motion.div
            className="w-full"
            key={animal.name}
            variants={itemVariants}
            layout
          >
            <BCard
              imgSrc={animal.gifAvatarUrl}
              title={animal.name}
              vote={animal.vote}
              onClick={() =>
                setSelectedAnimal(
                  !selectedAnimal || selectedAnimal.id !== animal.id
                    ? animal
                    : undefined
                )
              }
              isSelected={selectedAnimal?.id === animal.id}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const Dashboard = () => {
  const { stage, selectedAnimal } = useAppContext();

  useEffect(() => {
    document.title = "Lucky Village | Home";
  }, []);

  return (
    <>
      <GradientBackground />
      <div className="container flex flex-col items-center p-2 gap-5 m-auto overflow-x-clip justify-center">
        <div className="w-full flex flex-col gap-3 z-10 overflow-x-clip">
          <div className="relative flex flex-col items-center">
            <h2 className="text-2xl font-bold select-none mb-3">Prize Pool</h2>
            <AnimatedNumber
              target={stage?.prizePool || 0}
              tooltip="This is the current prize pool! Buy a ticket now for your chance to win big!"
              symbol="$"
              size="lg"
              className="nabla-regular relative z-10 mb-5"
            />
            <motion.div
              className="absolute -top-[40px] opacity-20 blur-sm z-0 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            >
              <img className="w-[250px]" src={GoldBG} alt="Gold Background" />
            </motion.div>
          </div>
          <CardBox />
          <VoteBox />
          <div className="p-4 bg-gradient-to-b from-background-200 to-transparent rounded-lg border border-white/10 backdrop-blur-sm rounded-b-none border-b-0 pb-10">
            {selectedAnimal ? (
              <>
                <h3 className="text-xl font-bold mb-2 text-center">
                  {selectedAnimal.name}
                </h3>
                <p className="mb-4 opacity-60">{selectedAnimal.description}</p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold mb-2 text-center">
                  The Enchanted Kingdom of Whiskerwisp
                </h3>
                <p className="mb-4 opacity-60">
                  In a realm where magic dances on the breeze and the sun sets
                  in a symphony of colors, lies the Enchanted Kingdom of
                  Whiskerwisp. This mystical land is ruled by five legendary
                  animals, each shrouded in mystery and wonder. Whiskerwisp, the
                  ethereal feline, glides through the mist with an elegance that
                  defies the laws of nature. Flickerdoodle, a fiery spirit,
                  blazes trails of light as it leaps through the air. MystiPurr,
                  the guardian of the cosmos, holds the secrets of the universe
                  in its starry gaze. DandyPounce, a vibrant burst of energy,
                  brings life and joy to every corner of the kingdom. And
                  Puzzlebounce, the curious wanderer, explores the world with a
                  kaleidoscope of colors and endless curiosity.
                </p>
                <p className="mb-4 opacity-60">
                  Once a year, the kingdom hosts a grand spectacle where the
                  bravest souls gather to place their bets on which of these
                  majestic creatures will claim the throne. This is not merely a
                  game of chance, but a celebration of courage, wisdom, and the
                  indomitable spirit of Whiskerwisp.
                </p>
                <p className="font-bold opacity-60">
                  Dare to join the adventure and cast your vote! Will you choose
                  the mystical Whiskerwisp, the blazing Flickerdoodle, or the
                  enigmatic MystiPurr? Place your bets now and become a part of
                  this legendary tale!
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
