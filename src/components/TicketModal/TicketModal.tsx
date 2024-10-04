import { Reorder } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";

import Button from "../../common/Button";
import Dropdown from "../../common/Dropdown";
import Modal from "../../common/Modal/Modal";
import { useAppContext } from "../../hooks/useAppContext";
import { ANIMALS } from "../../lib/constants";
import { Animal } from "../../lib/types";
import BCalendar, { Value } from "../BCalendar";
import AnimalItem from "./AnimalItem";

const generateTimeOptions = (selectedDate: Date) => {
  const options = [];
  const currentDate = new Date();
  const isToday = selectedDate.toDateString() === currentDate.toDateString();
  const startHour = isToday ? currentDate.getHours() + 1 : 0;

  for (let hour = startHour; hour < 24; hour++) {
    const timeOption = `${hour.toString().padStart(2, "0")}:00`;
    options.push({ label: timeOption, value: timeOption });
  }

  return options;
};

interface TicketModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
const TicketModal: React.FC<TicketModalProps> = ({ isOpen, closeModal }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [animals, setAnimals] = useState<Animal[]>(ANIMALS);
  const [date, setDate] = useState<Value>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const { votes } = useAppContext();

  const timeOptions = useMemo(() => {
    if (date instanceof Date) {
      const options = generateTimeOptions(date);
      options.length > 0 ? setTime(options[0].value) : setTime(null);
      return options;
    }
    return [];
  }, [date]);

  const handleDateChange = useCallback((newDate: Value) => {
    if (newDate instanceof Date) {
      setDate(newDate);
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="bg-background-100 p-5 rounded shadow border-secondary-100">
        <p className="ml-2 mb-1 font-bold">
          Select your desired order by dragging
        </p>
        <div className="w-[500px] flex" ref={divRef}>
          <Reorder.Group
            axis="x"
            className="flex"
            values={animals}
            onReorder={(newOrder) => {
              setAnimals(newOrder);
            }}
          >
            {animals.map((item) => (
              <Reorder.Item key={item.name} value={item}>
                <AnimalItem item={item} vote={votes[item.name]} />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
        <div className="my-5 flex gap-3 justify-between">
          <div className="flex items-center gap-3">
            <BCalendar value={date} onChange={handleDateChange} />
            <Dropdown options={timeOptions} value={time} onChange={setTime} />
          </div>
          <Button>Buy | $20</Button>
        </div>
        <div>
          <p className="ml-2 mb-2 font-bold">History</p>
          <div className="bg-background-200 p-5 rounded">
            <p className="m-auto text-center text-sm">
              No history available for the selected time
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketModal;
