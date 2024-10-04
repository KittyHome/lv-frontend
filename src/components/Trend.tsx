import { useState } from "react";

import { ANIMALS } from "../lib/constants";
import BCalendar, { Value } from "./BCalendar";
import TrendGraph from "./TrendGraph/TrendGraph";

const generateSampleData = () => {
  const series: any[] = [];
  ANIMALS.forEach((animal) => {
    const data = [];
    for (let hour = 0; hour < 24; hour++) {
      const time = `${String(hour).padStart(2, "0")}:00`;
      const value = Math.floor(Math.random() * 100);
      data.push({ primary: time, secondary: value });
    }
    series.push({ label: animal.name, data });
  });
  return series;
};

const Trend = () => {
  const [date, setDate] = useState<Value>(new Date());

  const handleDateChange = (newDate: Value) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-secondary-100 to-background-200 rounded border border-background-100 shadow backdrop-blur w-full">
      <div className="px-5 p-3 w-full">
        <div className="flex justify-between items-center w-full">
          <p className="font-bold text-2xl">Trends</p>
          <div className="flex items-center gap-2">
            Select date:
            <BCalendar
              value={date}
              onChange={handleDateChange}
              direction="right"
            />
          </div>
        </div>
      </div>
      <TrendGraph data={generateSampleData()} />
    </div>
  );
};

export default Trend;
