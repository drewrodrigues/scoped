import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, useHistory } from "react-router-dom";
import { MainRoutes } from "./components/mainRoutes";
import { PopoverLayer } from "./components/popover";
import { Sidebar } from "./components/sidebar/sidebar";
import "./data/db";
import { getAll } from "./data/modelCrud";
import {
  ISavedGoal,
  ISavedScope,
  ISavedTask,
  ISavedTracking,
} from "./data/modelTypes";
import { goalsLoaded } from "./store/goalSlice";
import { scopesLoaded } from "./store/scopeSlice";
import { store } from "./store/store";
import { tasksLoaded } from "./store/taskSlice";
import { trackingLoaded } from "./store/trackingSlice";
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

    async function loadEverything() {
      const scopes = await getAll<ISavedScope>("Scope");
      dispatch(
        scopesLoaded({
          scopes,
          selectedScopeId: lastSelectedScopeId,
        })
      );
      console.log("👍🏽 Scoped Loaded");

      const goals = await getAll<ISavedGoal>("Goal");
      dispatch(goalsLoaded({ goals }));
      console.log("👍🏽 Goals Loaded");

      const tracking = await getAll<ISavedTracking>("Tracking");
      dispatch(trackingLoaded({ values: tracking }));
      console.log("👍🏽 Tracking Loaded");

      const tasks = await getAll<ISavedTask>("Task");
      dispatch(tasksLoaded({ values: tasks }));
      setLoadingState("loaded");
    }

    loadEverything();
  }, []);

  if (loadingState === "loading") {
    return <p>Loading</p>;
  }

  return (
    <div className="flex bg-[#E9EAEE] h-[100vh]">
      <PopoverLayer />
      <Sidebar />
      <MainRoutes />
    </div>
  );
}

addEventListener("DOMContentLoaded", () => {
  const client = document.querySelector("#client");
  ReactDOM.render(<TopLeverWrapper />, client);
});
