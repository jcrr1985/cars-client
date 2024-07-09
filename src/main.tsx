import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

export const apiUrl =
  "https://cars-server-o9l6wrigq-jcrr1985s-projects.vercel.app";
// export const apiUrl = "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
