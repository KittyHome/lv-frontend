import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";

import Button from "../common/Button";
import Modal from "../common/Modal/Modal";
import { useAuth } from "../hooks/useAuth";
import { fetchDailySpinData, fetchDailySpinIndex } from "../lib/firebase/utils";
import { SpinItem } from "../lib/types";
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
  const { user } = useAuth();
  const [spinItems, setSpinItems] = useState<SpinItem[] | undefined>();
  const targetIndexRef = useRef<number>();
  const [isShowResult, setIsShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.isSpinAvailable) {
      setLoading(true);
      fetchDailySpinData()
        .then(setSpinItems)
        .finally(() => setLoading(false));
    }
  }, [user?.isSpinAvailable]);

  const handleSpin = useCallback(() => {
    spinItems &&
      fetchDailySpinIndex(spinItems).then(
        (targetIndex) => (targetIndexRef.current = targetIndex)
      );
  }, [spinItems]);

  const handleCompleted = useCallback(() => {
    setIsShowResult(true);
  }, []);

  const item =
    spinItems &&
    targetIndexRef?.current !== undefined &&
    spinItems[targetIndexRef.current];

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="relative bg-gradient-to-b from-primary-200/90 to-background-100 rounded-lg w-[26rem] shadow-lg">
        <div className="py-8">
          <h3 className="text-3xl text-center font-bold">Spin to Win Big!</h3>
        </div>
        <div
          className={clsx("relative", isShowResult ? "h-[17rem]" : "h-[21rem]")}
        >
          <AnimatePresence>
            {!isShowResult && !loading && (
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
                  onSpin={handleSpin}
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
                {item && (
                  <div className="flex flex-col items-center justify-center relative z-30 h-full w-full">
                    <span className="size-72 flex items-center justify-center">
                      {item.type === "credit" ? (
                        <img
                          src={BagGoldCoins}
                          alt="Credit"
                          className="-mt-3"
                        />
                      ) : item.type === "votes" ? (
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
                      {item.type === "credit"
                        ? `You have won $${item.amount} credits!`
                        : item.type === "votes"
                        ? `You have received ${item.amount} free votes!`
                        : `You can withdraw ${item.amount} times today!`}
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
