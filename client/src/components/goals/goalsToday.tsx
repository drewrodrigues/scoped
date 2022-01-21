import moment from "moment";
import React, { useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { todaysDate } from "../../helpers/date";
import { useGoalsInSelectedScope } from "../../store/goalSlice";
import { Button } from "../shared/button";
import { GoalToday } from "./goalToday";
import GoalsDone from "../../images/goals_done.svg";

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

  const allGoalsDismissed = goals.every((goal) => {
    return (
      goal.lastDismissed &&
      moment(goal.lastDismissed).isSame(todaysDate(), "day")
    );
  });

  return (
    <main>
      <header className="flex justify-between mb-[20px] items-center">
        <h2>Goals</h2>
        <Button text="" onClick={saveDismissedSetting}>
          {showDismissed ? <FaEyeSlash /> : <FaEye />}
        </Button>
      </header>
      {allGoalsDismissed && !showDismissed ? (
        <section className="flex flex-col justify-center items-center bg-white rounded-[3px] py-[50px]">
          <img src={GoalsDone} className="w-[500px]" />
          <h4 className="mt-[20px]">Awesome, you're all done for the day!</h4>
        </section>
      ) : (
        <ul>
          {goals.map((goal) => (
            <GoalToday goal={goal} showDismissed={showDismissed} />
          ))}
        </ul>
      )}
    </main>
  );
}
