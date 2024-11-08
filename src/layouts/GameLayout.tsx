import { Outlet } from "react-router-dom";

import FloatingTicketButton from "../components/FloatingTicketButton";
import FloatingSpinButton from "../components/FloatingSpinButton";

const GameLayout: React.FC = () => {
  return (
    <>
      <Outlet />
      <FloatingTicketButton />
      <FloatingSpinButton />
    </>
  );
};

export default GameLayout;
