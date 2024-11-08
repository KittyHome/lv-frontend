import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import { toast } from "react-toastify";

import Button from "../common/Button";
import Modal from "../common/Modal/Modal";
import { useAppContext } from "../hooks/useAppContext";
import { applySpin } from "../lib/supabase/utils";
import { Bonus, SpinItem } from "../lib/types";
import DailySpin from "./DailySpin";
import BagGoldCoins from "/images/Bag-gold-coins.png";
import CashOut from "/images/cash-out.png";
import GoldBg from "/images/gold_bg.webp";
import VoteUp from "/images/voteup.png";

interface SpinModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
const SpinModal: React.FC<SpinModalProps> = ({ isOpen, closeModal }) => {
  const [spinItems, setSpinItems] = useState<SpinItem[] | undefined>();
  const [isShowResult, setIsShowResult] = useState(false);
  const { spin: targetSpin } = useAppContext();
  const targetIndexRef = useRef<number>();
  const [result, setResult] = useState<SpinItem>();

  useEffect(() => {
    if (!targetSpin) return;

    const generateRandomSpinData = (): SpinItem => {
      const types: Bonus[] = ["withdraw", "credit", "votes"];
      return {
        type: types[Math.floor(Math.random() * types.length)],
        amount: Math.floor(Math.random() * 100) + 1,
      };
    };

    const randomSpinItems = Array.from({ length: 16 }, generateRandomSpinData);
    const randomIndex = Math.floor(Math.random() * randomSpinItems.length);

    randomSpinItems[randomIndex] = targetSpin;
    setSpinItems(randomSpinItems);
    setResult(targetSpin);
    targetIndexRef.current = randomIndex;
  }, [targetSpin]);

  const handleCompleted = useCallback(() => {
    setIsShowResult(true);
    applySpin().catch((err) => {
      toast.error(`Error applying spin: ${err.message}`);
    });
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div
        className="relative bg-gradient-to-b from-primary-200/90 to-background-100 rounded-lg max-w-[26rem] shadow-lg mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-8">
          <h3 className="text-3xl text-center font-bold">Spin to Win Big!</h3>
        </div>
        <div
          className={clsx("relative", isShowResult ? "h-[17rem]" : "h-[21rem]")}
        >
          <AnimatePresence>
            {!isShowResult && (
              <motion.div
                className="absolute w-full h-full"
                initial={{ scale: 0 }}
                animate={{ scale: isShowResult ? 0 : 1 }}
                exit={{ scale: isShowResult ? 1 : 0 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                <DailySpin
                  presents={spinItems || []}
                  target={targetIndexRef}
                  onCompleted={handleCompleted}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {isShowResult && (
            <div className="absolute z-0 w-[26rem] h-[26rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.img
                src={GoldBg}
                alt="size-full pointer-events-none select-none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
            </div>
          )}
          <AnimatePresence>
            {isShowResult && (
              <motion.div
                className="absolute w-full h-full -top-4"
                initial={{ scale: 0 }}
                animate={{ scale: isShowResult ? 1 : 0 }}
                exit={{ scale: isShowResult ? 0 : 1 }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              >
                {result && (
                  <div className="flex flex-col items-center justify-center relative z-30 h-full w-full">
                    <span className="size-72 flex items-center justify-center">
                      {result.type === "credit" ? (
                        <img
                          src={BagGoldCoins}
                          alt="Credit"
                          className="-mt-3"
                        />
                      ) : result.type === "votes" ? (
                        <img
                          src={VoteUp}
                          alt="Votes"
                          className="w-[16rem] -mt-2"
                        />
                      ) : (
                        <img src={CashOut} alt="Withdraw" className="mt-4" />
                      )}
                    </span>
                    <span className="absolute -bottom-8 font-bold text-xl">
                      {result.type === "credit"
                        ? `You have won $${result.amount} credits!`
                        : result.type === "votes"
                        ? `You have received ${result.amount} free votes!`
                        : `You can withdraw ${result.amount} times today!`}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-center text px-5 mt-8 text-text-200 pb-10">
          Feeling lucky? Spin the wheel and see what amazing prizes await you!
          Don't miss your chance to win big and have fun!
        </p>
        <AnimatePresence>
          {isShowResult && (
            <motion.div
              className="p-5 pt-0 w-full"
              initial={{ scale: 0 }}
              animate={{ scale: isShowResult ? 1 : 0 }}
              exit={{ scale: isShowResult ? 0 : 1 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Button className="w-full" onClick={closeModal}>
                Continue
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        {isShowResult && (
          <Confetti
            className="absolute w-full h-full"
            recycle={false}
            numberOfPieces={500}
          />
        )}
      </div>
    </Modal>
  );
};

export default SpinModal;
