import moment from "moment";
import React, { useMemo, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { todaysDate } from "../../helpers/date";
import { useGoalsInSelectedScope } from "../../store/goalSlice";
import { Button } from "../shared/button";
import { GoalToday } from "./goalToday";
import GoalsDone from "../../images/goals_done.svg";
import { EmptyState } from "../emptyState";
import GoalEmpty from "../../images/goal_empty.svg";
import { useSelectedScope } from "../../store/scopeSlice";
import { goalsTodayQuantities } from "../../hooks/goalHooks";

const SHOW_DISMISSED = "SHOW_DISMISSED";

type ComponentShown = "CompleteEmptyState" | "Goals" | "GoalEmptyState";

interface GoalTodayProps {}

export function GoalsToday({}: GoalTodayProps) {
  const scope = useSelectedScope();
  const goals = useGoalsInSelectedScope();
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
