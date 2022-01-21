import moment from "moment";
import React, { useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { todaysDate } from "../../helpers/date";
import { useGoalsInSelectedScope } from "../../store/goalSlice";
import { Button } from "../shared/button";
import { GoalToday } from "./goalToday";
import GoalsDone from "../../images/goals_done.svg";

const SHOW_DISMISSED = "SHOW_DISMISSED";

interface GoalTodayProps {}

export function GoalsToday({}: GoalTodayProps) {
  const goals = useGoalsInSelectedScope();
  const [showDismissed, setShowDismissed] = useState(() => {
    const savedShowDismissedSetting = localStorage.getItem(SHOW_DISMISSED);
    console.log({ savedShowDismissedSetting });
    return !!savedShowDismissedSetting;
  });

  function saveDismissedSetting() {
    if (!showDismissed) {
      localStorage.setItem(SHOW_DISMISSED, "true");
    } else {
      localStorage.removeItem(SHOW_DISMISSED);
    }
    setShowDismissed(!showDismissed);
  }

  const goalsDismissedCount = goals.reduce((total, goal) => {
    if (
      goal.lastDismissed &&
      moment(goal.lastDismissed).isSame(todaysDate(), "day")
    ) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  const allGoalsDismissed = goalsDismissedCount === goals.length;
  const goalsLeft = goals.length - goalsDismissedCount;

  return (
    <main>
      <header className="flex justify-between mb-[20px] items-center">
        <div>
          <h2>Goals</h2>
          <h3 className="text-[10px] text-[#777]">
            {allGoalsDismissed
              ? "All goals handled"
              : `${goalsLeft} goal${goalsLeft === 1 ? "" : "s"} left`}
          </h3>
        </div>

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
