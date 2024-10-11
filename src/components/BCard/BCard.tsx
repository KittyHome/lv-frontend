import { useCallback, useMemo, useState } from "react";

import VoteButton from "./VoteButton";
import LineChart from "./LineChart";
import NumberPad from "./NumberPad";
import { motion } from "framer-motion";
import { AnimalId } from "../../lib/types";

const generateRandomData = () => {
  const data = Array.from({ length: 12 }, (_, index) => {
    const hour = index * 2;
    return {
      primary: `${String(hour).padStart(2, "0")}:30`,
      secondary: Math.floor(Math.random() * 250),
    };
  });
  return [{ label: "Hello", data }];
};

interface BCardProps {
  imgSrc: string;
  title: string;
  description: string;
  vote: number;
}

const BCard: React.FC<BCardProps> = ({ imgSrc, title, description, vote }) => {
  const chartData = useMemo(() => generateRandomData(), []);
  const [isUp, setIsUp] = useState(true);

  const changeMode = useCallback(
    (mode: boolean) => () => {
      setIsUp(mode);
    },
    []
  );

  return (
    <div className="bg-secondary-100/80 p-2 rounded-lg flex lg:flex-row xl:flex-col gap-2 overflow-clip h-full w-full justify-center items-center border border-background-100 shadow-lg">
      <div className="flex lg:flex-col flex-row gap-3 w-full h-[fit-content]">
        <div className="flex items-center">
          <div className="relative xl:max-w-full lg:max-w-[230px] lg:max-h-[180px] xl:max-h-full lg:aspect-auto xl:aspect-square max-w-[120px] overflow-clip flex items-center rounded-lg">
            <img src={imgSrc} className="rounded-lg" />
            <div className="absolute bg-background-200 top-2 left-2 px-4 h-[25px] w-[fit-content] flex items-center justify-center rounded-full opacity-80">
              {vote}
            </div>
            <motion.div
              className={`absolute left-0 top-0 w-full h-full backdrop-blur rounded-lg flex gap-2 flex-col overflow-clip xl:p-2 p-0.5`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              whileTap={{ opacity: 1 }}
            >
              <div className="flex flex-col overflow-y-auto h-full w-full md:px-3 md:py-1 xl:p-1 px-1">
                <div className="lg:text-xl text-[12px] font-bold">{title}</div>
                <div className="lg:text-sm text-[10px]">{description}</div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="flex flex-col min-w-[230px]">
          <div className="p-2 flex justify-between items-center rounded-lg">
            <VoteButton active={isUp} onClick={changeMode(true)} />
            <NumberPad isUp={isUp} name={title as AnimalId} />
            <VoteButton
              active={!isUp}
              direction="down"
              textPosition="right"
              onClick={changeMode(false)}
            />
          </div>
          <div className="relative bg-background-200 border border-primary-100/30 border-dashed flex flex-col justify-between items-center rounded-lg mt-1 shadow-lg">
            <div className="relative z-[5] w-full h-[55px]">
              <LineChart data={chartData} />
            </div>
            <span className="absolute top-1 left-1 z-30 text-[10px] bg-primary-100/30 backdrop-blur px-2 rounded-full">
              Trends
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BCard;
