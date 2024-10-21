import { Navigate, Route, Routes } from "react-router-dom";

import GameLayout from "./layouts/GameLayout";
import MainLayout from "./layouts/MainLayout";
import Account from "./pages/Account";
import ComingSoon from "./pages/ComingSoon";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Result from "./pages/Result";
import Transactions from "./pages/Transactions";
import ProtectRoute from "./components/ProtectRoute";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<GameLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Route>
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/results" element={<Result />} />
        <Route element={<ProtectRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/transactions" element={<Transactions />} />
        </Route>
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}

export default App;
