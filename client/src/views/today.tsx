import React from "react";
import { GoalsToday } from "../components/goals/goalsToday";
import { TasksToday } from "../components/tasks";
import { View } from "./view";
import TodayImage from "../images/today.svg";

interface TodayProps {}

export function Today({}: TodayProps) {
  return (
    <View title="Today">
      <div className="flex justify-between">
        <div className="w-[49%]">
          <GoalsToday />
        </div>

        <div className="w-[49%]">
          <TasksToday />
        </div>
      </div>
    </View>
  );
}
