import { Outlet } from "react-router-dom";

import FloatingTicketButton from "../components/FloatingTicketButton";

const GameLayout: React.FC = () => {
  return (
    <>
      <Outlet />
      <FloatingTicketButton />
    </>
  );
};

export default GameLayout;
