import { motion } from "framer-motion";

import { ANIMALS } from "../lib/constants";
import { AnimalId } from "../lib/types";

interface RankItemProps {
  id: AnimalId;
  vote: number;
  rank: number;
}
const RankItem: React.FC<RankItemProps> = ({ id, rank }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div
        className="relative w-[135%] mix-blend-screen"
        style={{
          paddingBottom: "150%",
        }}
      >
        <img
          className="grayscale hover:grayscale-0 transition-all hover:opacity-90 absolute top-0 left-0 w-full h-full object-cover brightness-50 hover:brightness-100 z-10 mix-blend-overlay"
          style={{
            clipPath:
              rank === 1
                ? "polygon(0% 0, 100% 0, 100% 100%, 0 100%)"
                : "polygon(20% 0, 100% 0, 100% 100%, 0 100%)",
          }}
          src={ANIMALS.find((animal) => animal.name === id)?.avatar}
          alt="Animal Image"
        />
        <div
          className="absolute w-full h-full z-0"
          style={{
            backgroundImage: "url(/images/bg-pattern.svg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPositionX: "right",
          }}
        ></div>
      </div>
    </motion.div>
  );
};

const Rank = () => {
  return (
    <div className="relative overflow-clip">
      <div className="flex justify-center -translate-x-[6.7%]">
        {ANIMALS.map((animal, idx) => (
          <div
            key={animal.name}
            className="w-full"
            style={{
              transform: `translateX(${8 * idx}%)`,
            }}
          >
            <RankItem id={animal.name} vote={5} rank={idx + 1} />
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-b from-background-100 to-transparent absolute w-full h-[30px] left-0 top-0"></div>
      <div className="bg-gradient-to-t from-background-100 to-transparent absolute w-full h-[30px] left-0 bottom-0"></div>
      <div className="bg-gradient-to-r from-background-100 to-transparent absolute w-[30px] h-full left-0 top-0"></div>
      <div className="bg-gradient-to-l from-background-100 to-transparent absolute w-[30px] h-full right-0 top-0"></div>
    </div>
  );
};

export default Rank;
