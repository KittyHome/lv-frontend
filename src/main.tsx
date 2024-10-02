import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import { AppProvider } from "./hooks/useAppContext.tsx";
import "./index.css";
import "react-circular-progressbar/dist/styles.css";

const error = console.error;
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <main
      data-theme="dark"
      className="bg-background-100 text-text-100 min-h-screen"
    >
      <AppProvider>
        <Router>
          <App />
        </Router>
      </AppProvider>
    </main>
  </StrictMode>
);
