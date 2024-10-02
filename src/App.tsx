import { Navigate, Route, Routes } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
