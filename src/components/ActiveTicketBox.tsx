import { useState } from "react";
import PopupPanel from "../common/PopupPanel";
import { AnimalId } from "../lib/types";
import moment from "moment";
import { ANIMALS } from "../lib/constants";

type Ticket = {
  order: AnimalId[];
  createdAt: Date;
};

interface ActiveTicketProps {
  ticket: Ticket;
}

const ActiveTicket: React.FC<ActiveTicketProps> = ({ ticket }) => {
  const { order, createdAt } = ticket;

  return (
    <div className="bg-background-100 hover:bg-background-200 cursor-pointer rounded-lg border border-text-100/10">
      <div className={`p-2 text-sm`}>
        <p className="text-xs text-gray-500 text-right">
          {moment(createdAt).fromNow()}
        </p>
        <div className="flex justify-between mt-1">
          {order.map((animalName, index) => {
            const animal = ANIMALS.find((a) => a.name === animalName);
            return (
              animal && (
                <img
                  key={index}
                  src={animal.avatar}
                  alt={animal.name}
                  className="h-12 w-12 inline-block rounded"
                />
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ActiveTicketBox = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      order: [
        "DandyPounce",
        "Flickerdoodle",
        "MystiPurr",
        "Puzzlebounce",
        "Whiskerwisp",
      ],
      createdAt: new Date(),
    },
    {
      order: [
        "Flickerdoodle",
        "DandyPounce",
        "MystiPurr",
        "Puzzlebounce",
        "Whiskerwisp",
      ],
      createdAt: new Date(),
    },
  ]);

  return (
    <PopupPanel className="relative w-[300px] flex flex-col">
      <div className="w-full bg-primary-100 p-2 h-[fit-content] flex justify-between">
        <p className="text-sm font-bold">Active tickets</p>
        <div className="flex items-center gap-2 text-sm">
          <button className="hover:opacity-80">Show all</button>
        </div>
      </div>
      <div className="flex flex-col overflow-y-auto max-h-[300px] gap-1 p-1">
        {tickets.length > 0 ? (
          tickets.map((ticket, idx) => (
            <ActiveTicket key={idx} ticket={ticket} />
          ))
        ) : (
          <div className="w-full flex items-center justify-center p-5 opacity-50">
            No active ticket
          </div>
        )}
      </div>
    </PopupPanel>
  );
};

export default ActiveTicketBox;
