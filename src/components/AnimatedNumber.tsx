import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import clsx from "clsx";

interface AnimatedNumberProps {
  target: number;
  size?: "sm" | "md" | "lg";
  tooltip?: string;
  symbol?: string;
  className?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  size = "md",
  tooltip,
  symbol,
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInView) {
      interval = setInterval(() => {
        setCurrentValue((prev) => {
          const difference = target - prev;
          if (Math.abs(difference) < 1) {
            clearInterval(interval);
            return target;
          }
          return prev + difference * 0.2;
        });
      }, 20);
    } else {
      setCurrentValue(0);
    }
    return () => clearInterval(interval);
  }, [target, isInView]);

  return (
    <div
      ref={ref}
      className="flex items-center flex-col mb-5"
      data-tooltip-id="animated-number-tooltip"
      data-tooltip-content={tooltip}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2, yoyo: Infinity },
        }}
        className={clsx(
          "bg-gradient-to-r from-primary-100 via-primary-200 to-primary-300 text-transparent bg-clip-text select-none",
          size === "sm" ? "text-xl" : size === "lg" ? "text-6xl" : "text-2xl",
          className
        )}
      >
        {symbol}
        {currentValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </motion.div>
    </div>
  );
};

export default AnimatedNumber;
