import { motion } from "framer-motion";
import { useCallback } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDocumentCheck, HiHome, HiTicket } from "react-icons/hi2";
import { IoSettings } from "react-icons/io5";
import { MdNotifications, MdOutlineSupportAgent } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import Button from "../common/Button";
import PopupPanel from "../common/PopupPanel";
import { useAppContext } from "../hooks/useAppContext";
import { useAuth } from "../hooks/useAuth";
import { signOut } from "../lib/firebase/auth";
import BPopup from "./BPopup";
import Inbox from "./Inbox";
import MiniLogo from "/favicon.png";
import Logo from "/logo.png";
import ActiveTicketBox from "./ActiveTicketBox";

const MenuButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={`flex items-center gap-3 p-2 px-3 text-center w-full text-sm bg-background-100/80 hover:bg-background-200 ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
};

const TopbarButton = ({
  className = "",
  children,
  ...props
}: React.ComponentProps<typeof motion.button>) => {
  return (
    <motion.button
      initial={{ opacity: 0.75 }}
      whileHover={{ scale: 1.05, opacity: 1 }}
      className={`flex justify-center items-center text-sm gap-2 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const TOPBAR_BUTTONS = [
  {
    title: "Home",
    navigate: "/",
    icon: <HiHome />,
  },
  {
    title: "Terms of Service",
    navigate: "/terms",
    icon: <HiDocumentCheck />,
  },
  {
    title: "Contact",
    navigate: "/contact-us",
    icon: <MdOutlineSupportAgent />,
  },
];

const Topbar = () => {
  const navigate = useNavigate();
  const { myTickets, openAuthModal } = useAppContext();
  const { user } = useAuth();

  const handleAuthButton = useCallback(() => {
    openAuthModal();
  }, [openAuthModal]);

  const handleAccount = useCallback(() => {
    navigate("/account");
  }, [navigate]);

  const handleSignout = useCallback(() => {
    signOut();
    navigate("/");
  }, [navigate]);

  return (
    <div className="container m-auto sticky top-0 z-50 p-2">
      <div className="h-[60px] flex items-center justify-between px-3 backdrop-blur rounded-lg shadow-lg border border-text-200/10">
        <div className="md:flex hidden items-center gap-5">
          <img
            src={Logo}
            className="h-8 cursor-pointer"
            alt="Lucky Village Logo"
            onClick={() => navigate("/")}
          />
          {TOPBAR_BUTTONS.map((tb) => (
            <TopbarButton key={tb.title} onClick={() => navigate(tb.navigate)}>
              {tb.icon} {tb.title}
            </TopbarButton>
          ))}
        </div>
        <div className="md:hidden flex items-center gap-3">
          <BPopup
            trigger={
              <Button variant="secondary">
                <GiHamburgerMenu />
              </Button>
            }
            position="bottom left"
          >
            <PopupPanel className="w-[200px] flex flex-col">
              {TOPBAR_BUTTONS.map((tb) => (
                <MenuButton
                  key={tb.title}
                  onClick={() => navigate(tb.navigate)}
                >
                  {tb.icon} {tb.title}
                </MenuButton>
              ))}
            </PopupPanel>
          </BPopup>
          <img
            src={MiniLogo}
            className="h-6 cursor-pointer"
            alt="Lucky Village Logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <BPopup
                trigger={
                  <Button
                    variant="secondary"
                    className="text-xl"
                    badge={myTickets.length}
                  >
                    <HiTicket />
                  </Button>
                }
              >
                <ActiveTicketBox />
              </BPopup>

              <BPopup
                trigger={
                  <Button variant="secondary" className="text-xl" badge={0}>
                    <MdNotifications />
                  </Button>
                }
              >
                <Inbox />
              </BPopup>

              <BPopup
                trigger={
                  <Button className="font-bold bg-background-200">
                    {user.username}
                  </Button>
                }
                position="bottom right"
              >
                <PopupPanel className="w-[280px]">
                  <div className="w-[160px] flex flex-col items-center justify-center gap-2">
                    <div className="flex gap-3 items-center">
                      <label>Balance: </label>
                      <p className="font-bold">${user.money?.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <label>Free votes: </label>
                      <p className="font-bold">{user.votes}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <MenuButton onClick={handleAccount}>
                      <IoSettings />
                      Setting
                    </MenuButton>
                    <MenuButton onClick={handleAccount}>
                      <HiTicket />
                      Tickets
                    </MenuButton>
                    <MenuButton
                      className="bg-primary-100 text-text-100 hover:bg-primary-200"
                      onClick={handleSignout}
                    >
                      <FaSignOutAlt /> Sign out
                    </MenuButton>
                  </div>
                </PopupPanel>
              </BPopup>
            </>
          ) : (
            <Button onClick={handleAuthButton} className="font-bold">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
