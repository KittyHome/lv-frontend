import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import VoteButton from "./VoteButton";
import BarChart from "./BarChart";
import NumberPad from "./NumberPad";

const generateRandomData = () => {
  return Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? "00" : "30";
    const nextHour = index % 2 === 0 ? hour : (hour + 1) % 24;
    const nextMinute = minute === "00" ? "30" : "00";
    const label = `${String(hour).padStart(2, "0")}:${minute}-${String(
      nextHour
    ).padStart(2, "0")}:${nextMinute}`;
    return {
      label,
      data: [
        {
          primary: `${String(hour).padStart(2, "0")}:${
            index % 2 === 0 ? "15" : "45"
          }`,
          secondary: Math.floor(Math.random() * 250),
        },
      ],
    };
  });
};

interface BCardProps {
  imgSrc: string;
  title: string;
  description: string;
}

const BCard: React.FC<BCardProps> = ({ imgSrc, title, description }) => {
  const chartData = useMemo(() => generateRandomData(), []);
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState(300);
  const [isBelowXL, setIsBelowXL] = useState(false);
  const [isUp, setIsUp] = useState(true);

  useEffect(() => {
    const div = divRef.current;
    if (div) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setDivHeight(entry.contentRect.height);
        }
      });
      resizeObserver.observe(div);
      return () => resizeObserver.unobserve(div);
    }
  }, []);

  const updateScreenSize = () => {
    setIsBelowXL(window.innerWidth < 1280);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const dynamicStyle = useMemo(
    () => ({
      height: isBelowXL ? `${divHeight}px` : "auto",
    }),
    [divHeight, isBelowXL]
  );

  const changeMode = useCallback(
    (mode: boolean) => () => {
      setIsUp(mode);
    },
    []
  );

  return (
    <div className="bg-secondary-100/80 p-2 rounded flex md:flex-row xl:flex-col gap-2 overflow-clip h-full w-full justify-center items-center border border-background-100 shadow-lg">
      <div ref={divRef} className="flex flex-col gap-2 w-full h-[fit-content]">
        <div className="relative">
          <video
            src={imgSrc}
            className="rounded pointer-events-none"
            autoPlay
            loop
            muted
          />
          {/* <img src={imgSrc} className="rounded" /> */}
          <div className="absolute bg-background-200 top-2 left-2 px-4 h-[25px] w-[fit-content] flex items-center justify-center rounded-full opacity-80">
            7283627
          </div>
        </div>
        <div className="p-2 flex justify-between items-center rounded">
          <VoteButton active={isUp} onClick={changeMode(true)} />
          <NumberPad isUp={isUp} name={title} />
          <VoteButton
            active={!isUp}
            direction="down"
            textPosition="right"
            onClick={changeMode(false)}
          />
        </div>
        <div className="p-2 bg-background-200 flex justify-between items-center rounded">
          <BarChart data={chartData} />
        </div>
      </div>
      <div
        className="flex-1 flex gap-2 flex-col overflow-clip"
        style={dynamicStyle}
      >
        <div className="flex flex-col overflow-y-auto h-full min-w-[200px] md:px-3 md:py-1 xl:p-1 px-3">
          <div className="text-xl font-bold">{title}</div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default BCard;
