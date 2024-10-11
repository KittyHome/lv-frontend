import { useCallback, useMemo, useState } from "react";

import BCalendar, { Value } from "./BCalendar";
import Dropdown from "../common/Dropdown";

const Timeline = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [selectedHour, setSelectedHour] = useState<string | null>(null);

  const hourOptions = useMemo(() => {
    const hours = [];
    const currentDate = new Date();
    const selectedDate = new Date(date as Date);
    const isToday = currentDate.toDateString() === selectedDate.toDateString();
    const currentHour = currentDate.getHours();
    for (let i = 0; i < 24; i++) {
      const hourValue = `${i < 10 ? "0" : ""}${i}:00`;
      if (isToday && i > currentHour) break;
      hours.push({ value: hourValue, label: hourValue });
    }
    if (hours.length > 0) {
      setSelectedHour(hours[0].value);
    }
    return hours;
  }, [date]);

  const handleHourChange = useCallback((hour: string) => {
    setSelectedHour(hour);
  }, []);

  const handleDateChange = useCallback((newDate: Value) => {
    if (newDate instanceof Date) {
      setDate(newDate);
      setSelectedHour("00:00");
    }
  }, []);

  return (
    <div className="flex justify-end">
      <div className="flex items-center gap-2">
        <span className="text-sm text-ellipsis text-nowrap overflow-hidden">
          Choose date and time:
        </span>
        <BCalendar value={date} onChange={handleDateChange} direction="right" />
        <Dropdown
          options={hourOptions}
          value={selectedHour}
          onChange={handleHourChange}
        />
      </div>
    </div>
  );
};

export default Timeline;
