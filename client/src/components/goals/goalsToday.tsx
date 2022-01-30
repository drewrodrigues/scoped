import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { goalsTodayQuantities } from "../../utils/goalUtils";
import GoalsDone from "../../images/goals_done.svg";
import GoalEmpty from "../../images/goal_empty.svg";
import { useGoalsInProgressInSelectedScope } from "../../store/goalSlice";
import { useSelectedScope } from "../../store/scopeSlice";
import { EmptyState } from "../emptyState";
import { Button } from "../shared/button";
import { GoalToday } from "./goalToday";

const SHOW_DISMISSED = "SHOW_DISMISSED";

type ComponentShown = "CompleteEmptyState" | "Goals" | "GoalEmptyState";

export function GoalsToday() {
  const scope = useSelectedScope();
  const goals = useGoalsInProgressInSelectedScope();
  const { isAllGoalsDismissed, goalsLeft } = goalsTodayQuantities(goals);
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

  let componentShown: ComponentShown;
  if (isAllGoalsDismissed && !showDismissed) {
    componentShown = "CompleteEmptyState";
  } else if (goals.length) {
    componentShown = "Goals";
  } else {
    componentShown = "GoalEmptyState";
  }

  return (
    <main>
      <header className="flex justify-between mb-[20px] items-center">
        <div>
          <h2>Goals</h2>
          <h3 className="text-[10px] text-[#777]">
            {isAllGoalsDismissed
              ? "All goals handled"
              : `${goalsLeft} goal${goalsLeft === 1 ? "" : "s"} left`}
          </h3>
        </div>

        <Button text="" onClick={saveDismissedSetting}>
          {showDismissed ? <FaEyeSlash /> : <FaEye />}
        </Button>
      </header>

      {componentShown === "CompleteEmptyState" && (
        <EmptyState
          title="Great Job"
          subtitle="You've handled all goals today"
          img={GoalsDone}
        />
      )}

      {componentShown === "Goals" && (
        <ul>
          {goals.map((goal) => (
            <GoalToday goal={goal} showDismissed={showDismissed} />
          ))}
        </ul>
      )}

      {componentShown === "GoalEmptyState" && (
        <EmptyState
          img={GoalEmpty}
          title={`No ${scope?.title} Goals Yet`}
          subtitle="Add a new goal from the goal page"
        />
      )}
    </main>
  );
}
