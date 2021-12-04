import React from "react";
import ReactDOM from "react-dom";

import "./styles/reset.scss";

declare global {
  interface Window {
    electron: {
      ipcEmit: (arg: string) => void;
    };
  }
}

export function Client() {
  return <>Doing the thisngs</>;
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<Client />, client);
});
