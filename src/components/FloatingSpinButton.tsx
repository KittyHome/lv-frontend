import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import { useAppContext } from "../hooks/useAppContext";
import { useAuth } from "../hooks/useAuth";
import SpinModal from "./SpinModal";
import Spin from "/images/lucky-spin.png";

const FloatingSpinButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const { openAuthModal } = useAppContext();

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleClick = useCallback(() => {
    if (user?.isSpinAvailable) {
      setIsOpen(true);
    } else {
      toast.info("Please log in to purchase a ticket.");
      openAuthModal();
    }
  }, [user, openAuthModal]);

  useEffect(() => {
    user?.isSpinAvailable && setIsOpen(true);
  }, [user?.isSpinAvailable]);

  return (
    <>
      {user?.isSpinAvailable && (
        <motion.img
          onClick={handleClick}
          src={Spin}
          className="fixed bottom-[7rem] right-8 w-16 h-16 text-white rounded-full shadow-lg flex items-center justify-center text-3xl z-50 cursor-pointer"
          alt="Spin"
          data-tooltip-id="global-tooltip"
          data-tooltip-content="Spin the wheel for a chance to win amazing prizes!"
          whileHover={{ scale: 1.1 }}
        />
      )}
      <SpinModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default FloatingSpinButton;
