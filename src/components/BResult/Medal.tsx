import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import AnimatedNumber from "../AnimatedNumber";

type AnimationState = {
  opacity: number;
  scale: number;
};

interface MedalProps {
  imgSrc: string;
  count: number;
}

const initialAnimation: AnimationState = {
  opacity: 0,
  scale: 0.8,
};

const finalAnimation: AnimationState = {
  opacity: 1,
  scale: 1,
};

const Medal: React.FC<MedalProps> = ({ imgSrc, count }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const [animation, setAnimation] = useState<AnimationState>(initialAnimation);

  useEffect(() => {
    setAnimation(isInView ? finalAnimation : initialAnimation);
  }, [isInView]);

  return (
    <div ref={ref} className="flex flex-col items-center justify-center gap-2">
      <motion.img
        className="w-[80px]"
        src={imgSrc}
        alt="Medal"
        initial={initialAnimation}
        animate={animation}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
      <AnimatedNumber
        target={count}
        className="text-white font-mono font-bold"
        size="sm"
      />
    </div>
  );
};

export default Medal;
