import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, useHistory } from "react-router-dom";
import { MainRoutes } from "./components/mainRoutes";
import { Sidebar } from "./components/sidebar/sidebar";
import "./data/db";
import { getAll } from "./data/modelCrud";
import { ISavedGoal, ISavedScope } from "./data/modelTypes";
import { goalsLoaded } from "./store/goalSlice";
import { scopesLoaded } from "./store/scopeSlice";
import { store } from "./store/store";
import "./styles/output.css";

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
  const history = useHistory();

  useEffect(() => {
    const lastSelectedScopeId = localStorage.getItem("lastSelectedScopeId");
    const lastSelectedStateLink = localStorage.getItem(
      "LAST_SELECTED_STATE_LINK"
    );

    if (lastSelectedStateLink) {
      history.push(lastSelectedStateLink);
    }

    getAll<ISavedScope>("Scope").then((scopes) => {
      dispatch(
        scopesLoaded({
          scopes,
          selectedScopeId: lastSelectedScopeId,
        })
      );
      console.log("👍🏽 Scoped Loaded");
    });

    getAll<ISavedGoal>("Goal").then((goals) => {
      dispatch(goalsLoaded({ goals }));
      setLoadingState("loaded");
      console.log("👍🏽 Goals Loaded");
    });
  }, []);

  if (loadingState === "loading") {
    return <p>Loading</p>;
  }

  return (
    <div className="flex bg-[#f1f3f6] h-[100vh]">
      <Sidebar />
      <MainRoutes />
    </div>
  );
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<TopLeverWrapper />, client);
});
