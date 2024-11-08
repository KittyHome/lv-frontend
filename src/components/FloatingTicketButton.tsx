import React, { useCallback, useState } from "react";
import { HiTicket } from "react-icons/hi2";
import { toast } from "react-toastify";

import { useAppContext } from "../hooks/useAppContext";
import { useAuth } from "../hooks/useAuth";
import TicketModal from "./TicketModal/TicketModal";

const FloatingTicketButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const { openAuthModal } = useAppContext();

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClick = useCallback(() => {
    if (user) {
      setIsOpen(true);
    } else {
      toast.info("Please log in to purchase a ticket.");
      openAuthModal();
    }
  }, [user, openAuthModal]);

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform text-3xl z-50"
        data-tooltip-id="global-tooltip"
        data-tooltip-content="Buy new ticket to win the game!"
      >
        <HiTicket />
      </button>
      <TicketModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default FloatingTicketButton;
