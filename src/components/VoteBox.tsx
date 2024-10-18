import clsx from "clsx";
import { motion, PanInfo } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import Button from "../common/Button";
import { useAppContext } from "../hooks/useAppContext";
import { useAuth } from "../hooks/useAuth";
import { voteTo } from "../lib/supabase/utils";

const MIN = -100;
const MAX = 100;

const VoteBox = () => {
  const { user } = useAuth();
  const { selectedAnimal, openAuthModal } = useAppContext();
  const divRef = useRef<HTMLDivElement | null>(null);
  const [divWidth, setDivWidth] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const updateButtonStatus = () => {
      const now = new Date();
      const voteDisabledUntil = new Date(user?.voteDisabledDate || 0);
      const secondsLeft = (voteDisabledUntil.getTime() - now.getTime()) / 1000;

      if (secondsLeft > 0) {
        setIsButtonDisabled(true);
        setCountdown(`${Math.ceil(secondsLeft)} seconds`);
      } else {
        setIsButtonDisabled(false);
        setCountdown("");
      }
    };

    updateButtonStatus();

    const intervalId = setInterval(updateButtonStatus, 1000);

    return () => clearInterval(intervalId);
  }, [user?.voteDisabledDate]);

  useEffect(() => {
    const updateDivWidth = () => {
      if (divRef.current) {
        setDivWidth(divRef.current.clientWidth - 50);
      }
    };

    updateDivWidth();

    window.addEventListener("resize", updateDivWidth);

    return () => window.removeEventListener("resize", updateDivWidth);
  }, []);

  const updateCurrentValue = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const parentDivLeftEdge = divRef.current?.getBoundingClientRect().left || 0;
    const relativeX = info.point.x - parentDivLeftEdge;
    const progress = Math.max(0, Math.min(relativeX / divWidth, 1));
    const value = MIN + progress * (MAX - MIN);
    setCurrentValue(Math.round(value));
  };

  const handleClick = useCallback(() => {
    if (user) {
      if (selectedAnimal?.name && currentValue !== 0 && !isButtonDisabled) {
        voteTo(selectedAnimal.name, currentValue)
          .then(() => {
            const direction = currentValue > 0 ? "up" : "down";
            toast.success(
              `Vote successfully recorded for ${
                selectedAnimal.name
              }. Amount: ${Math.abs(currentValue)} (${direction}).`
            );
          })
          .catch((error) =>
            toast.error(`Failed to cast vote: ${error.message}`)
          );
      }
    } else {
      toast.info("Please log in to purchase a ticket.");
      openAuthModal();
    }
  }, [
    user,
    selectedAnimal?.name,
    isButtonDisabled,
    currentValue,
    openAuthModal,
  ]);

  return (
    <div>
      <p className="text-xs italic opacity-50">
        Please select an animal first, then drag to cast your vote.
      </p>
      <div className="relative w-full">
        <div
          className="w-full h-[5px] bg-gradient-to-r from-red-500 to-green-500"
          ref={divRef}
        ></div>
        <motion.div
          className="w-[50px] flex-col flex items-center justify-center"
          drag
          dragConstraints={{ top: 0, bottom: 0, left: 0, right: divWidth }}
          dragElastic={false}
          dragMomentum={false}
          onDrag={updateCurrentValue}
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
            variant="secondary"
            className={clsx(
              "w-full",
              isButtonDisabled
                ? "cursor-not-allowed opacity-50"
                : currentValue > 0
                ? "bg-green-500 hover:bg-green-400"
                : "bg-red-500 hover:bg-red-400"
            )}
            onClick={handleClick}
            disabled={isButtonDisabled}
          >
            {isButtonDisabled ? (
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
