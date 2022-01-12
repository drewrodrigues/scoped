import React from "react";
import { Route, Switch } from "react-router-dom";
import { Settings } from "../views/settings";
import { Dashboard } from "../views/dashboard";
import { Tasks } from "../views/tasks";
import { Goals } from "../views/goals";
import { Reminders } from "../views/reminders";

interface RouterProps {}

export function MainRoutes({}: RouterProps) {
  return (
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/reminders" component={Reminders} />
      <Route path="/settings" component={Settings} />
      <Route path="/goals" component={Goals} />
      <Route path="/" component={Goals} />
      {/* <Route path="/" component={Habits} /> */}
    </Switch>
  );
}
