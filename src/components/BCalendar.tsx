import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (value: Value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Input
        className="cursor-pointer"
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
