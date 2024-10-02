import Gold from "/images/gold.png";
import Silver from "/images/silver.png";
import Brozen from "/images/brozen.png";
import Medal from "./Medal";
import { GiHamburgerMenu } from "react-icons/gi";
import { motion } from "framer-motion";

const BResult = () => {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-secondary-100 to-background-200 rounded border border-background-100 shadow backdrop-blur overflow-clip w-full">
      <div
        className="px-5 p-3 relative min-h-[290px] w-full"
        style={{
          backgroundImage: "url(/images/bg-pattern.svg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-between items-center">
          <p className="font-bold text-2xl">Betting Result</p>
          <button className="p-2 text-xl">
            <GiHamburgerMenu />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center my-5">
          <div className="items-center gap-10 justify-center flex">
            <Medal imgSrc={Gold} count={1238} />
            <Medal imgSrc={Silver} count={83} />
            <Medal imgSrc={Brozen} count={733} />
          </div>
          <motion.div
            className="font-bold font-mono grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 justify-items-center p-4 rounded-lg shadow-lg bg-gradient-to-r from-primary-200 to-primary-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Players: 999999
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Prize: $999999
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Dist: $999999
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Trans: $999999
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BResult;
