// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./variables.css";
import "./index.css";
import { NavToggleContextProvider } from "./context/NavToggleContext.tsx";
import { UserLoggedInContextProvider } from "./context/UserLoggedInContext.tsx";
import { DataContextProvider } from "./context/DataContext.tsx";
import { ModalVisibilityProvider } from "./context/ModalVisibilityContext.tsx";
// import { Workbox } from "workbox-window";

// if ("serviceWorker" in navigator) {
//   const wb = new Workbox("/sw.js");
//   wb.register();
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <DataContextProvider>
    <UserLoggedInContextProvider>
      <ModalVisibilityProvider>
        <NavToggleContextProvider>
          <App />
        </NavToggleContextProvider>
      </ModalVisibilityProvider>
    </UserLoggedInContextProvider>
  </DataContextProvider>,
  // </React.StrictMode>,
);
