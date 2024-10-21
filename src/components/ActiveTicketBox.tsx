import clsx from "clsx";
import moment from "moment";

import PopupPanel from "../common/PopupPanel";
import { useAppContext } from "../hooks/useAppContext";
import { Ticket } from "../lib/types";

interface ActiveTicketProps {
  ticket: Ticket;
  size?: "sm" | "md";
}
export const ActiveTicket: React.FC<ActiveTicketProps> = ({
  ticket,
  size = "md",
}) => {
  const { animals } = useAppContext();
  const { order, createdAt } = ticket;

  return (
    <div className="hover:bg-background-200 cursor-pointer rounded-lg">
      <div
        className={clsx(
          "text-sm p-1",
          size === "md" ? "flex justify-between items-center" : "flex flex-col"
        )}
      >
        {size === "sm" && (
          <p className="text-right text-sm text-gray-500 mb-1">
            {moment(createdAt).fromNow()}
          </p>
        )}
        <div className={clsx("gap-2 flex justify-between")}>
          {order.map((animalName, index) => {
            const animal = animals.find((a) => a.name === animalName);
            return (
              animal && (
                <img
                  key={index}
                  src={animal.staticAvatarUrl}
                  alt={animal.name}
                  className="h-12 w-12 inline-block rounded-lg"
                />
              )
            );
          })}
        </div>
        {size === "md" && (
          <p className="text-xs text-gray-500 text-right bg-background-200 rounded-full py-1 px-3">
            {moment(createdAt).fromNow()}
          </p>
        )}
      </div>
    </div>
  );
};

const ActiveTicketBox = () => {
  const { myTickets } = useAppContext();

  return (
    <PopupPanel className="relative w-[300px] flex flex-col">
      <div className="w-full bg-primary-100 p-2 h-[fit-content] flex justify-between">
        <p className="text-sm font-bold">Active tickets</p>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-[300px] gap-1 p-1">
        {myTickets.length > 0 ? (
          myTickets.map((ticket, idx) => (
            <ActiveTicket key={idx} ticket={ticket} size="sm" />
          ))
        ) : (
          <div className="w-full flex items-center justify-center p-5 opacity-50">
            No active tickets available
          </div>
        )}
      </div>
    </PopupPanel>
  );
};

export default ActiveTicketBox;
