import clsx from "clsx";
import { Reorder } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import Button from "../../common/Button";
import Modal from "../../common/Modal/Modal";
import { useAppContext } from "../../hooks/useAppContext";
import { ANIMALS } from "../../lib/constants";
import { createTicket, fetchNextGameTime } from "../../lib/firebase/utils";
import { Animal } from "../../lib/types";
import AnimalItem from "./AnimalItem";

interface TicketModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
const TicketModal: React.FC<TicketModalProps> = ({ isOpen, closeModal }) => {
  const { votes } = useAppContext();
  const divRef = useRef<HTMLDivElement>(null);
  const [animals, setAnimals] = useState<Animal[]>(ANIMALS);
  const [time, setTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchNextGameTime().then((nextTime?: Date) => {
        if (nextTime) {
          const currentTime = new Date();
          const timeDifference =
            (nextTime.getTime() - currentTime.getTime()) / (1000 * 60);

          if (timeDifference < 30) {
            setTime(null);
          } else {
            setTime(nextTime);
          }
        }
      });
    }
  }, [isOpen]);

  const handleSubmit = useCallback(() => {
    if (time === null) {
      toast.warning(
        "The ticket for this game is sold out. Please wait for the next game to start."
      );
    } else {
      setIsLoading(true);

      const order = animals.map((animal, index) => ({
        key: animal.name,
        rank: index,
      }));

      createTicket(order)
        .then(() => toast.success("New ticket created successfully!"))
        .catch((error) => {
          toast.error("Failed to create a ticket!");
          console.error(error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [time]);

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
        <div className="my-5 flex flex-col justify-between">
          <Button
            className={clsx(
              "w-full",
              time === null ? "cursor-not-allowed" : "cursor-pointer"
            )}
            variant={time ? "primary" : "secondary"}
            disabled={time === null}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <BeatLoader className="py-1.5" color="#ffffff" size={8} />
            ) : (
              "Buy | $20"
            )}
          </Button>
          <p className="text-primary-100 italic text-sm mt-1">
            The ticket for this game is sold out. Please wait for the next game
            to start.
          </p>
        </div>
        <div>
          <p className="ml-2 mb-2 font-bold">History</p>
          <div className="bg-background-200 p-5 rounded">
            <p className="m-auto text-center text-sm">No history available</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketModal;
