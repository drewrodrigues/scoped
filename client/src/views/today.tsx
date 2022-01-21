import React from "react";
import { GoalsToday } from "../components/goals/goalsToday";
import { View } from "./view";

interface TodayProps {}

export function Today({}: TodayProps) {
  return (
    <View>
      <h3 className="font-bold text-[22px] mb-[20px]">Today</h3>

      <GoalsToday />
    </View>
  );
}
