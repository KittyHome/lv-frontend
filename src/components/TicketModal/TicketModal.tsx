import clsx from "clsx";
import { Reorder } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";

import Button from "../../common/Button";
import Modal from "../../common/Modal/Modal";
import { useAppContext } from "../../hooks/useAppContext";
import { useAuth } from "../../hooks/useAuth";
import { MAX_COUNT_OF_ACTIVE_TICKETS, TICKET_PRICE } from "../../lib/constants";
import { buyNewTicket } from "../../lib/supabase/utils";
import { AnimalId } from "../../lib/types";
import { ActiveTicket } from "../ActiveTicketBox";
import AnimalItem from "./AnimalItem";

interface TicketModalProps {
  isOpen: boolean;
  closeModal: () => void;
}
const TicketModal: React.FC<TicketModalProps> = ({ isOpen, closeModal }) => {
  const { animals, myTickets, stage } = useAppContext();
  const { user } = useAuth();
  const divRef = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<AnimalId[]>(
    animals.map((animal) => animal.name)
  );
  const [isLoading, setIsLoading] = useState(false);

  const isSold = useMemo(() => {
    if (!stage || !isOpen) return true;

    const currentTime = new Date();
    const timeDifference =
      (stage.endedAt.getTime() - currentTime.getTime()) / (1000 * 60);
    return timeDifference < 30;
  }, [stage, isOpen]);

  const handleSubmit = useCallback(() => {
    if (isLoading) return;

    if (isSold) {
      toast.warning(
        "The ticket for this game is sold out. Please wait for the next game to start."
      );
      return;
    }

    if (myTickets.length >= MAX_COUNT_OF_ACTIVE_TICKETS) {
      toast.warning(
        "You have reached the maximum limit of active tickets. Please use or manage your existing tickets before acquiring more."
      );
      return;
    }

    if (!user?.money || user.money < TICKET_PRICE) {
      toast.warning(
        "You do not have sufficient funds to purchase a ticket. Please add more money to your account to proceed."
      );
      return;
    }

    setIsLoading(true);
    buyNewTicket(order)
      .then(() => {
        toast.success("New ticket created successfully!");
        closeModal();
      })
      .catch((error) => {
        toast.error("Failed to create a ticket!");
        console.error(error);
      })
      .finally(() => setIsLoading(false));
  }, [order, isSold, isLoading, myTickets.length, user?.money, closeModal]);

  const isDisabled = useMemo(() => {
    return (
      isSold ||
      myTickets.length >= MAX_COUNT_OF_ACTIVE_TICKETS ||
      !user?.money ||
      user.money < TICKET_PRICE
    );
  }, [isSold, myTickets.length, user?.money]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="mx-auto max-w-[540px] p-1">
        <div className="bg-background-100 sm:px-5 px-2 py-5 rounded-lg shadow border-secondary-100 w-full">
          <p className="ml-2 mb-1 font-bold">
            Select your desired order by dragging
          </p>
          <div className="flex" ref={divRef}>
            <Reorder.Group
              axis="x"
              className="flex"
              values={order}
              onReorder={(newOrder) => {
                setOrder(newOrder);
              }}
            >
              {order.map((item) => (
                <Reorder.Item key={item} value={item}>
                  <AnimalItem
                    animal={animals.find((animal) => animal.name === item)}
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
          <div className="my-5 flex flex-col justify-between">
            <Button
              className={clsx(
                "w-full",
                isDisabled ? "cursor-not-allowed" : "cursor-pointer"
              )}
              variant={isDisabled ? "secondary" : "primary"}
              disabled={isDisabled}
              onClick={handleSubmit}
            >
              {isLoading ? (
                <BeatLoader className="py-1.5" color="#ffffff" size={8} />
              ) : (
                "Buy | $20"
              )}
            </Button>
            {isSold && (
              <p className="text-primary-100 italic text-sm mt-1">
                The ticket for this game is sold out. Please wait for the next
                game to start.
              </p>
            )}
            {myTickets.length >= MAX_COUNT_OF_ACTIVE_TICKETS && (
              <p className="text-primary-100 italic text-sm mt-1">
                You have reached the maximum limit of active tickets. Please use
                or manage your existing tickets before acquiring more.
              </p>
            )}
            {(!user?.money || user.money < TICKET_PRICE) && (
              <p className="text-primary-100 italic text-sm mt-1">
                You do not have sufficient funds to purchase a ticket. Please
                add more money to your account to proceed.
              </p>
            )}
          </div>
          <div>
            <p className="ml-2 mb-2 font-bold">Active tickets</p>
            <div className="bg-background-200 rounded-lg p-1">
              {myTickets.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {myTickets
                    .sort(
                      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
                    )
                    .map((ticket, idx) => (
                      <ActiveTicket key={idx} ticket={ticket} />
                    ))}
                </div>
              ) : (
                <p className="m-auto text-center text-sm py-5">
                  No active tickets available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketModal;
