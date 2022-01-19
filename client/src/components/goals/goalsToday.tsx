import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useGoalsInSelectedScope } from "../../store/goalSlice";
import { Button } from "../shared/button";
import { GoalToday } from "./goalToday";

interface GoalTodayProps {}

export function GoalsToday({}: GoalTodayProps) {
  const goals = useGoalsInSelectedScope();

  return (
    <main>
      <h2 className="font-bold">Goals</h2>
      <ul>
        {goals.map((goal) => (
          <GoalToday goal={goal} />
        ))}
      </ul>
    </main>
  );
}
