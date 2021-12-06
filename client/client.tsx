import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./components/mainRoutes";
import { Sidebar } from "./components/sidebar";

import { store } from "./store/store";
import "./data/db";

import "./styles/styles.scss";
import "./_client.scss";
import { Provider } from "react-redux";

declare global {
  interface Window {
    electron: {
      ipcEmit: (arg: string) => void;
    };
  }
}

export function Client() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="client">
          <Sidebar />
          <MainRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<Client />, client);
});
