import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./components/mainRoutes";
import { Sidebar } from "./components/sidebar";

import "./styles/styles.scss";
import "./_client.scss";

declare global {
  interface Window {
    electron: {
      ipcEmit: (arg: string) => void;
    };
  }
}

export function Client() {
  return (
    <BrowserRouter>
      <div className="client">
        <Sidebar />
        <MainRoutes />
      </div>
    </BrowserRouter>
  );
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<Client />, client);
});
