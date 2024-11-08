import { Outlet } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import AuthModal from "../components/AuthModal/AuthModal";
import Banner from "../components/Banner";
import FloatingClock from "../components/FloatingClock";
import Footer from "../components/Footer";
import Topbar from "../components/Topbar";
import { useAuth } from "../hooks/useAuth";

const MainLayout = () => {
  const { user } = useAuth();
  return (
    <>
      {!user && (
        <Banner content="Sign-up now to start winning bets and earning money!" />
      )}
      <Topbar />
      <div className="z-0 flex-grow max-w-[1284px] mx-auto w-full">
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
    </>
  );
};

export default MainLayout;
