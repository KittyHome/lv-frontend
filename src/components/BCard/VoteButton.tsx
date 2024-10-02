import clsx from "clsx";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { TbThumbUpFilled, TbThumbDownFilled } from "react-icons/tb";

interface VoteButtonProps {
  direction?: "up" | "down";
  textPosition?: "right" | "left";
  showText?: boolean;
  active?: boolean;
  onClick: () => void;
}

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, x: 0 },
};

const buttonVariants = {
  initial: { rotate: 0 },
  hover: { rotate: 360 },
};

const VoteButton: React.FC<VoteButtonProps> = ({
  direction = "up",
  textPosition = "right",
  showText = false,
  active = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const color = useMemo(
    () =>
      active
        ? direction === "up"
          ? "text-green-500"
          : "text-red-500"
        : "text-gray-700",
    [active, direction]
  );
  const text = direction === "up" ? "Up" : "Down";

  const adjustedTextVariants = useMemo(
    () => ({
      hidden: { ...textVariants.hidden, x: textPosition === "left" ? -10 : 10 },
      visible: textVariants.visible,
    }),
    [textPosition]
  );

  return (
    <motion.div
      className="flex items-center gap-2"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {showText && textPosition === "left" && (
        <motion.span
          className={clsx(color, "opacity-0")}
          variants={adjustedTextVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      )}
      <motion.button
        className={clsx(color, "text-2xl")}
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        onClick={onClick}
      >
        {direction === "up" ? <TbThumbUpFilled /> : <TbThumbDownFilled />}
      </motion.button>
      {showText && textPosition === "right" && (
        <motion.span
          className={clsx(color, "opacity-0")}
          variants={adjustedTextVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          transition={{ duration: 0.3 }}
        >
          {text}
        </motion.span>
      )}
    </motion.div>
  );
};

export default VoteButton;
