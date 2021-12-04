import React from "react";
import ReactDOM from "react-dom";

export function Client() {
  return <>Poppinsg the client</>;
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<Client />, client);
});
