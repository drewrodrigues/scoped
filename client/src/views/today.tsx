import React from "react";
import { GoalsToday } from "../components/goals/goalsToday";
import { View } from "./view";

interface TodayProps {}

export function Today({}: TodayProps) {
  return (
    <View title="Today">
      <GoalsToday />
    </View>
  );
}
