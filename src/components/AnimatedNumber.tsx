import clsx from "clsx";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
      className="flex items-center flex-col"
      data-tooltip-id="global-tooltip"
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
          "select-none",
          size === "sm" ? "text-md" : size === "lg" ? "text-7xl" : "text-2xl",
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
