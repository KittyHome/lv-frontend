import { motion } from "framer-motion";

import Button from "../common/Button";
import Logo from "/logo.png";
import { useAppContext } from "../hooks/useAppContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Topbar = () => {
  const navigate = useNavigate();
  const { openAuthModal } = useAppContext();
  const { user } = useAuth();

  const handleAuthButton = useCallback(() => {
    openAuthModal();
  }, [openAuthModal]);

  const handleAccount = useCallback(() => {
    navigate("/account");
  }, [navigate]);

  return (
    <div className="h-[70px] flex items-center justify-between px-10 z-10 relative">
      <img
        src={Logo}
        className="h-10 cursor-pointer"
        alt="Lucky House Logo"
        onClick={() => navigate("/")}
      />
      <div className="flex items-center gap-5">
        <motion.button whileHover={{ scale: 1.05 }} className="font-bold">
          Contact Us
        </motion.button>
        {user ? (
          <Button onClick={handleAccount} className="font-bold">
            Account
          </Button>
        ) : (
          <Button onClick={handleAuthButton} className="font-bold">
            Get Started
          </Button>
        )}
      </div>
    </div>
  );
};

export default Topbar;
