import React, { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";

import Input from "../common/Input";
import clsx from "clsx";

type ValuePiece = Date | null;

export type Value = ValuePiece | [ValuePiece, ValuePiece];

interface BCalendarProps {
  value: Value;
  onChange: (value: Value) => void;
  direction?: "left" | "right";
}

const BCalendar: React.FC<BCalendarProps> = ({
  value,
  onChange,
  direction = "left",
}) => {
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (value: Value) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={calendarRef}>
      <Input
        className="cursor-pointer w-[100px]"
        type="text"
        readOnly
        value={value instanceof Date ? value.toLocaleDateString() : ""}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <Calendar
          className={clsx(
            "absolute mt-1 max-w-[300px] z-50",
            direction === "left" ? "left-0" : "right-0"
          )}
          onChange={handleDateChange}
          value={value}
          maxDate={new Date()}
        />
      )}
    </div>
  );
};

export default BCalendar;
