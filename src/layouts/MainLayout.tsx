import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import AuthModal from "../components/AuthModal/AuthModal";
import Banner from "../components/Banner";
import FloatingClock from "../components/FloatingClock";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";

const MainLayout = () => {
  return (
    <div>
      <Banner content="Sign-up now to get 100+ free votes!" />
      <Topbar />
      <div className="z-0">
        <Outlet />
      </div>
      <Tooltip
        id="global-tooltip"
        className="z-50 max-w-[250px]"
        style={{
          backgroundColor: "var(--color-background-200)",
        }}
      />
      <FloatingClock />
      <AuthModal />
      <Footer />
    </div>
  );
};

export default MainLayout;
