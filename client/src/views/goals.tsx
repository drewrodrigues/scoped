import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaAward,
  FaCalendarTimes,
  FaHourglassStart,
  FaTimes,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { EmptyState } from "../components/emptyState";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";
import { ItemFilter } from "../components/itemFilter";
import { Button } from "../components/shared/button";
import { ISavedGoal } from "../data/modelTypes";
import { todaysDate } from "../helpers/date";
import { getGoalStatus, GoalStatus } from "../utils/goalUtils";
import GoalEmpty from "../images/goal_empty.svg";
import { useGoalsInSelectedScope } from "../store/goalSlice";
import { hidePopover, showPopover } from "../store/popoverSlice";
import { useSelectedScope } from "../store/scopeSlice";
import { View } from "./view";

export function Goals() {
  const scope = useSelectedScope();
  const goals = useGoalsInSelectedScope();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<GoalStatus>(
    (localStorage.getItem("GOAL_FILTER") as GoalStatus) || GoalStatus.InProgress
  );

  function showNewGoalForm() {
    dispatch(
      showPopover({
        component: <GoalForm onClose={() => dispatch(hidePopover())} />,
      })
    );
  }

  const filteredGoals: Record<GoalStatus, ISavedGoal[]> = {
    [GoalStatus.InProgress]: [],
    [GoalStatus.Upcoming]: [],
    [GoalStatus.NoDates]: [],
    [GoalStatus.Failed]: [],
    [GoalStatus.Completed]: [],
  };

  goals.forEach((goal) => {
    filteredGoals[getGoalStatus(goal)].push(goal);
  });

  useEffect(() => {
    if (filter) {
      localStorage.setItem("GOAL_FILTER", filter);
    }
  }, [filter]);

  return (
    <View title="Goals">
      <header className="flex justify-between items-center mb-[20px]">
        {scope && <Button text="Add Goal" onClick={showNewGoalForm} />}

        <ItemFilter
          values={[
            {
              count: filteredGoals[GoalStatus.InProgress].length,
              label: GoalStatus.InProgress,
              Icon: FaHourglassStart,
            },
            {
              count: filteredGoals[GoalStatus.Upcoming].length,
              label: GoalStatus.Upcoming,
              Icon: FaArrowRight,
            },
            {
              count: filteredGoals[GoalStatus.Completed].length,
              label: GoalStatus.Completed,
              Icon: FaAward,
            },
            {
              count: filteredGoals[GoalStatus.Failed].length,
              label: GoalStatus.Failed,
              Icon: FaTimes,
            },
            {
              count: filteredGoals[GoalStatus.NoDates].length,
              label: GoalStatus.NoDates,
              Icon: FaCalendarTimes,
            },
          ]}
          onChange={(value) => setFilter(value)}
          selectedValue={filter}
        />
      </header>

      {goals.length ? (
        <section className="flex flex-wrap justify-between">
          {filteredGoals[filter].map((goal) => (
            <GoalIndexItem key={goal._id} {...goal} />
          ))}
        </section>
      ) : (
        <EmptyState
          img={GoalEmpty}
          title={`You don't have any ${scope?.title} goals yet`}
          subtitle="Try adding your first one"
        >
          <Button text="Add Goal" onClick={showNewGoalForm} />
        </EmptyState>
      )}
    </View>
  );
}
