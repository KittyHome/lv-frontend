import { Route, Routes } from "react-router-dom";

// import DefaultLayout from "./layouts/DefaultLayout";
// import Dashboard from "./pages/Dashboard";
// import Account from "./pages/Account";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <Routes>
      {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/account" element={<Account />} /> */}
      <Route path="*" element={<ComingSoon />} />
    </Routes>
  );
}

export default App;
