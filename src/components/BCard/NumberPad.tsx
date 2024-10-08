import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import { useAppContext } from "../../hooks/useAppContext";
import { AnimalId } from "../../lib/types";

interface NumberPadButtonProps {
  text: string;
  disabledDate?: Date;
  timeInterval: number;
  onClick: () => void;
}

const NumberPadButton: React.FC<NumberPadButtonProps> = ({
  text,
  disabledDate,
  timeInterval,
  onClick,
}) => {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (disabledDate && disabledDate.getTime() > new Date().getTime()) {
        const newProgress =
          1 -
          (disabledDate.getTime() - new Date().getTime()) / timeInterval / 1000;

        setProgress(newProgress > 0 ? newProgress : 0);
      } else {
        interval && clearInterval(interval);
        setProgress(null);
      }
    }, 500);

    return () => {
      interval && clearInterval(interval);
    };
  }, [disabledDate, timeInterval]);

  const handleClick = useCallback(() => {
    if (
      progress === null &&
      (!disabledDate || disabledDate.getTime() < new Date().getTime())
    ) {
      onClick();
    }
  }, [disabledDate, progress, onClick]);

  return (
    <div className="relative">
      <div
        className={clsx(
          "w-[45px] h-[45px] flex items-center justify-center cursor-pointer",
          "bg-background-100",
          progress !== null
            ? "cursor-not-allowed opacity-30"
            : "hover:bg-background-200"
        )}
        onClick={handleClick}
      >
        {text}
      </div>
      {progress !== null && (
        <div
          className={clsx(
            "absolute left-0 bottom-0 w-[45px]",
            "bg-blue-500/30"
          )}
          style={{
            height: `${progress * 45}px`,
          }}
        ></div>
      )}
    </div>
  );
};

interface NumberPadProps {
  name: AnimalId;
  isUp: boolean;
}

const NumberPad: React.FC<NumberPadProps> = ({ name, isUp }) => {
  const { padStates, updateDisabledDate } = useAppContext();

  return (
    <div
      className={clsx(
        "flex rounded-lg overflow-clip border shadow-lg",
        isUp ? "border-green-500" : "border-red-500"
      )}
    >
      {padStates.map((state) => (
        <NumberPadButton
          key={state.value}
          text={`${isUp ? state.value : -state.value}`}
          disabledDate={state.disabledDate}
          timeInterval={state.timeInterval}
          onClick={() => updateDisabledDate(name, isUp, state.id)}
        />
      ))}
    </div>
  );
};

export default NumberPad;
