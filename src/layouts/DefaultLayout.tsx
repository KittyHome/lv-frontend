import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import Topbar from "../components/Topbar";
import Banner from "../components/Banner";
import FloatingTicketButton from "../components/FloatingTicketButton";
import FloatingClock from "../components/FloatingClock/FloatingClock";
import AuthModal from "../components/AuthModal/AuthModal";
import Footer from "../components/Footer";

const DefaultLayout: React.FC = () => {
  return (
    <div>
      <Banner content="Don't miss out! Buy your tickets now and join the excitement!" />
      <Topbar />
      <div className="z-0">
        <Outlet />
      </div>
      <Tooltip id="animated-number-tooltip" className="z-50" />
      <FloatingTicketButton />
      <FloatingClock />
      <AuthModal />
      <Footer />
    </div>
  );
};

export default DefaultLayout;
