import { motion } from "framer-motion";
import clsx from "clsx";

import { AnimalId } from "../../lib/types";

interface BCardProps {
  imgSrc: string;
  title: AnimalId;
  vote: number;
  onClick: () => void;
  isSelected: boolean;
}

const BCard: React.FC<BCardProps> = ({
  imgSrc,
  title,
  vote,
  onClick,
  isSelected,
}) => {
  return (
    <div
      className="bg-secondary-100/80 justify-center items-center rounded-lg flex lg:flex-row xl:flex-col gap-2 overflow-clip h-full w-full border border-background-100 shadow-lg p-1"
      onClick={onClick}
    >
      <div
        className={clsx(
          "flex lg:flex-col flex-row gap-3 w-[fit-content] cursor-pointer",
          isSelected ? "border-primary-100 rounded-lg xl:border-4 border-2" : ""
        )}
      >
        <div className="flex items-center">
          <div className="relative xl:max-w-full lg:max-w-[230px] lg:max-h-[180px] xl:max-h-full lg:aspect-auto xl:aspect-square overflow-clip flex items-center rounded-lg">
            <img src={imgSrc} className="rounded-lg" />
            <motion.div
              className={`absolute left-0 top-0 w-full h-full backdrop-blur rounded-lg flex gap-2 flex-col overflow-clip xl:p-2 p-0.5`}
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              whileTap={{ opacity: 1 }}
            >
              <div className="flex items-center justify-center h-full w-full md:px-3 md:py-1 xl:p-1 px-1">
                <p className="lg:text-xl text-[12px] font-bold break-all w-full text-center">
                  {title}
                </p>
              </div>
            </motion.div>
            <div className="absolute bg-background-200/50 bottom-0 left-0 px-4 w-full flex items-center justify-center rounded-lg font-bold sm:text-xl text-xs backdrop-blur">
              {vote}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BCard;
