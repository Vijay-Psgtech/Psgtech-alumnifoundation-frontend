// ─── OPTION A: Fix in main.jsx (most common setup) ───────────────────────────
// frontend/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataProvider } from "./context/DataContext"; // ✅ import DataProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataProvider>   {/* ✅ wrap your entire app */}
      <App />
    </DataProvider>
  </React.StrictMode>
);

