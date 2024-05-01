// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./variables.css";
import "./index.css";
import { NavToggleContextProvider } from "./context/NavToggleContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <NavToggleContextProvider>
    <App />,
  </NavToggleContextProvider>,
  // </React.StrictMode>,
);
