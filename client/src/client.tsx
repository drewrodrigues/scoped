import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { MainRoutes } from "./components/mainRoutes";
import { Sidebar } from "./components/sidebar/sidebar";
import { Provider, useDispatch } from "react-redux";

import { store } from "./store/store";
import "./data/db";

import "./styles/output.css";
import { scopesLoaded } from "./store/scopeSlice";
import { Goal, IGoal, IScope, Scope } from "./data/couchModel";
import { goalsLoaded } from "./store/goalSlice";

declare global {
  interface Window {
    electron: {
      ipcEmit: (arg: string) => void;
    };
  }
}

type LoadingState = "loading" | "loaded";

function TopLeverWrapper() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Client />
      </BrowserRouter>
    </Provider>
  );
}

function Client() {
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const dispatch = useDispatch();

  useEffect(() => {
    Scope.all<IScope>().then((scopes) => {
      dispatch(scopesLoaded({ scopes, selectedScopeId: scopes[0]?._id }));
      console.log("👍🏽 Scoped Loaded");
    });

    Goal.all<IGoal>().then((goals) => {
      dispatch(goalsLoaded({ goals }));
      setLoadingState("loaded");
      console.log("👍🏽 Goals Loaded");
    });
  }, []);

  if (loadingState === "loading") {
    return <p>Loading</p>;
  }

  return (
    <div className="flex bg-[#f7f7f7] h-[100vh]">
      <Sidebar />
      <MainRoutes />
    </div>
  );
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<TopLeverWrapper />, client);
});
