import React from "react";
import { Route, Switch } from "react-router-dom";
import { Settings } from "../views/settings";
import { Goals } from "../views/goals";
import { Today } from "../views/today";
import { Tasks } from "../views/tasks";

interface RouterProps {}

export function MainRoutes({}: RouterProps) {
  return (
    <Switch>
      <Route path="/today" component={Today} />
      <Route path="/settings" component={Settings} />
      <Route path="/goals" component={Goals} />
      <Route path="/tasks" component={Tasks} />
      <Route path="/" component={Today} />
    </Switch>
  );
}
