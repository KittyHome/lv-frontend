import { motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { Bonus } from "../lib/types";
import BagGoldCoins from "/images/Bag-gold-coins.png";
import CashOut from "/images/cash-out.png";
import CryptoSpinText from "/images/crypto-spin-text.png";
import GoldBg from "/images/gold_bg.webp";
import PointCrypto from "/images/point_crypto.webp";
import SpinCenterCrypto from "/images/spin_center_crypto.webp";
import SpinCoreNewUser from "/images/spin_core_new_user.webp";
import SpinHand from "/images/spin_hand.webp";
import VoteUp from "/images/voteup.png";

interface DailySpinProps {
  presents: {
    type: Bonus;
    amount: number;
  }[];
  target?: React.MutableRefObject<number | undefined>;
  onSpin?: () => void;
  onCompleted: () => void;
}

function DailySpin({ presents, target, onSpin, onCompleted }: DailySpinProps) {
  const angleTimerID = useRef<any>(null),
    speedTimerID = useRef<any>(null),
    speed = useRef<number>(10),
    isSpeedLimit = useRef<any>(false);
  const [angle, setAngle] = useState(0);

  const handleTapClick = useCallback(() => {
    onSpin && onSpin();

    speed.current = 10;
    angleTimerID.current = setInterval(() => {
      setAngle((angle) => {
        if (!isSpeedLimit.current || target?.current === undefined)
          return (angle + speed.current) % 360;

        const targetAngle = 360 - 22.5 * target?.current;
        if (angle < targetAngle && targetAngle - angle < 1) {
          clearInterval(angleTimerID.current);
          clearInterval(speedTimerID.current);
          speed.current = 0;
          setTimeout(onCompleted, 1000);
          return targetAngle;
        } else if (angle > targetAngle)
          return (angle + (targetAngle + 360 - angle) / 50) % 360;
        return (angle + (targetAngle - angle) / 50) % 360;
      });
    }, 20);
    setTimeout(() => {
      speedTimerID.current = setInterval(() => {
        if (speed.current > 5) {
          speed.current = speed.current - 0.2;
        } else {
          isSpeedLimit.current = true;
        }
      }, 50);
    }, 3000);
  }, [onSpin, target]);

  return (
    <div className="flex flex-shrink-0 items-center justify-center">
      <div className="relative h-[21rem] w-[21rem]">
        <div className="relative h-full w-full">
          <div className="h-full w-full relative z-10">
            {presents.map((present, index) => (
              <div
                key={index}
                className="absolute top-1/2 z-30 flex w-full -translate-y-1/2 items-center justify-end font-semibold pr-5"
                style={{
                  transform: `translateY(-50%) rotate(${
                    22.5 * index + angle
                  }deg)`,
                }}
              >
                <span className="inline-flex items-center text-sm text-white text-shadow-white">
                  {present.amount}
                </span>
                <span className="ml-1 size-6">
                  {present.type === "credit" ? (
                    <img src={BagGoldCoins} alt="Credit" />
                  ) : present.type === "votes" ? (
                    <img src={VoteUp} alt="Votes" />
                  ) : (
                    <img src={CashOut} alt="Withdraw" />
                  )}
                </span>
              </div>
            ))}
            <div className="absolute z-10 w-[28rem] h-[28rem] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.img
                src={GoldBg}
                alt="size-full pointer-events-none select-none"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
            </div>
            <img
              src={SpinCoreNewUser}
              alt="Spin Core New User"
              className="absolute w-[23rem] z-20 pointer-events-none select-none"
              style={{
                transform: `rotate(${angle}deg)`,
              }}
            />
          </div>
          <img
            src={PointCrypto}
            alt="Point Crypto"
            className="absolute right-0 top-1/2 z-10 w-40 -translate-y-1/2 translate-x-8"
          />
        </div>
        <div
          className="cursor-pointer absolute left-0 top-0 z-50 w-full h-full"
          onClick={handleTapClick}
        >
          <div className="w-[6.25rem] absolute left-1/2 top-1/2 z-40 translate-y-5 translate-x-2">
            <motion.img
              src={SpinHand}
              className="pointer-events-none select-none"
              alt="Spin Hand"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: "easeInOut" }}
            />
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-[6rem] h-[6rem] relative"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={SpinCenterCrypto}
                alt="Spin Center Crypto"
                className="w-[6rem]"
              />
              <img
                src={CryptoSpinText}
                alt="Crypto Spin Text"
                className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailySpin;
