import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

export const apiUrl = "https://jobs-server-but9.onrender.com";
// export const apiUrl = "http://localhost:3001";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
