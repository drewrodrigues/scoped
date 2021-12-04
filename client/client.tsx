import React from "react";
import ReactDOM from "react-dom";

export function Client() {
  return <>Doing the thisngs</>;
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<Client />, client);
});
