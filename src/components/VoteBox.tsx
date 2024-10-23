import clsx from "clsx";
import { motion, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";

import Button from "../common/Button";
import { useAppContext } from "../hooks/useAppContext";
import { useAuth } from "../hooks/useAuth";
import useCountdown from "../hooks/useCountdown";
import { voteTo } from "../lib/supabase/utils";

const MAX = 100;

const VoteBox = () => {
  const { user } = useAuth();
  const { selectedAnimal, openAuthModal } = useAppContext();
  const { countdown, isDisabled } = useCountdown(user?.voteDisabledDate);
  const xPosition = useMotionValue(0);
  const [divWidth, setDivWidth] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const cursorDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateDivWidth = () =>
      setDivWidth(
        divRef.current?.clientWidth ? divRef.current.clientWidth - 50 : 0
      );
    window.addEventListener("resize", updateDivWidth);
    updateDivWidth();
    return () => window.removeEventListener("resize", updateDivWidth);
  }, []);

  const updateCurrentValue = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent) => {
      if (!divRef.current || !cursorDivRef.current) return;
      const parentDivRect = divRef.current.getBoundingClientRect();
      const cursorDivRect = cursorDivRef.current.getBoundingClientRect();
      const progress =
        (cursorDivRect.left +
          cursorDivRect.width / 2 -
          (parentDivRect.left + parentDivRect.width / 2)) /
        (parentDivRect.width / 2 - cursorDivRect.width / 2);
      setCurrentValue(Math.round(progress * MAX));
    },
    []
  );

  const cursorDivX = useMemo(() => {
    if (!divRef.current || !cursorDivRef.current) return 0;
    const parentDivRect = divRef.current.getBoundingClientRect();
    const cursorDivWidth = cursorDivRef.current.getBoundingClientRect().width;
    const center = parentDivRect.width / 2 + parentDivRect.left;
    return (
      (currentValue / MAX) * (parentDivRect.width / 2 - cursorDivWidth / 2) +
      center -
      cursorDivWidth / 2 -
      parentDivRect.left
    );
  }, [currentValue, divWidth]);

  useEffect(() => {
    xPosition.set(cursorDivX);
  }, [cursorDivX, xPosition]);

  const handleClick = useCallback(() => {
    if (!user) {
      toast.info("Please log in to purchase a ticket.");
      openAuthModal();
      return;
    }
    if (selectedAnimal?.name && currentValue !== 0 && !isDisabled) {
      voteTo(selectedAnimal.name, currentValue)
        .then(() => {
          const direction = currentValue > 0 ? "up" : "down";
          toast.success(
            `Vote successfully recorded for ${
              selectedAnimal.name
            }. Amount: ${Math.abs(currentValue)} (${direction}).`
          );
        })
        .catch((error) => toast.error(`Failed to cast vote: ${error.message}`));
    }
  }, [user, selectedAnimal?.name, currentValue, isDisabled, openAuthModal]);

  return (
    <div>
      <p className="text-xs italic opacity-50">
        Please select an animal first, then drag to cast your vote.
      </p>
      <div className="relative w-full" ref={divRef}>
        <div className="w-full h-[5px] bg-gradient-to-r from-red-500 to-green-500"></div>
        <motion.div
          ref={cursorDivRef}
          className="w-[50px] flex-col flex items-center justify-center"
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: divWidth }}
          dragElastic={false}
          dragMomentum={false}
          style={{
            x: xPosition,
          }}
          onDrag={updateCurrentValue}
          drag
        >
          <div
            className={clsx(
              "w-0 h-0 border-l-[5px] border-r-[5px] border-b-[10px]",
              currentValue > 0
                ? "border-l-transparent border-r-transparent border-b-green-500"
                : "border-l-transparent border-r-transparent border-b-red-500"
            )}
          ></div>
          <div
            className={clsx(
              "border w-full flex items-center justify-center rounded font-bold text-xl",
              currentValue > 0 ? "border-green-500" : "border-red-500"
            )}
          >
            {currentValue}
          </div>
        </motion.div>
      </div>
      {selectedAnimal && (
        <div className="flex gap-3 mt-2 sm:flex-row flex-col">
          <Button
            variant="ghost"
            className={clsx(
              "w-full",
              isDisabled
                ? "cursor-not-allowed opacity-50 bg-gray-500"
                : currentValue > 0
                ? "!bg-green-500 hover:!bg-green-400"
                : "!bg-red-500 hover:!bg-red-400"
            )}
            onClick={handleClick}
            disabled={isDisabled}
          >
            {isDisabled ? (
              `Available in ${countdown}`
            ) : (
              <>
                {currentValue > 0 ? "Give" : "Remove"}{" "}
                <strong>{Math.abs(currentValue)}</strong> vote
                {Math.abs(currentValue) !== 1 ? "s" : ""} for{" "}
                <strong>{selectedAnimal?.name}</strong>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default VoteBox;
