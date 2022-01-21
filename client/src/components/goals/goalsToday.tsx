import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useGoalsInSelectedScope } from "../../store/goalSlice";
import { Button } from "../shared/button";
import { GoalToday } from "./goalToday";

interface GoalTodayProps {}

export function GoalsToday({}: GoalTodayProps) {
  const goals = useGoalsInSelectedScope();
  const [showDismissed, setShowDismissed] = useState(() => {
    const savedShowDismissedSetting = localStorage.getItem("SHOW_DISMISSED");
    console.log({ savedShowDismissedSetting });
    return !!savedShowDismissedSetting;
  });

  function saveDismissedSetting() {
    if (!showDismissed) {
      localStorage.setItem("SHOW_DISMISSED", "true");
    } else {
      localStorage.removeItem("SHOW_DISMISSED");
    }
    setShowDismissed(!showDismissed);
  }

  return (
    <main>
      <header className="flex justify-between mb-[20px] items-center">
        <h2 className="font-bold">Goals</h2>
        <Button text="" onClick={saveDismissedSetting}>
          {showDismissed ? <FaEyeSlash /> : <FaEye />}
        </Button>
      </header>
      <ul>
        {goals.map((goal) => (
          <GoalToday goal={goal} showDismissed={showDismissed} />
        ))}
      </ul>
    </main>
  );
}
