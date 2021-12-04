import React from "react";
import { Routes, Route } from "react-router-dom";
import { Scopes } from "../views/scopes";
import { Settings } from "../views/settings";
import { Dashboard } from "../views/dashboard";
import { Tasks } from "../views/tasks";
import { Goals } from "../views/goals";
import { Habits } from "../views/habits";
import { Reminders } from "../views/reminders";

interface RouterProps {}

export function MainRoutes({}: RouterProps) {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/goals" element={<Goals />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/habits" element={<Habits />} />
      <Route path="/reminders" element={<Reminders />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
