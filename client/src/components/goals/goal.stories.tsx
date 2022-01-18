import React from "react";
import { GoalForm, _GoalForm } from "./goalForm";

export default {
  title: "Goal",
};

export const form = () => (
  <_GoalForm
    onClose={() => console.log("onClose")}
    onSave={(goal) => console.log({ goal }, "onSave")}
    scopeId="something"
  />
);
