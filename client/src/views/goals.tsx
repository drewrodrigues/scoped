import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EmptyState } from "../components/emptyState";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";
import { Button } from "../components/shared/button";
import GoalEmpty from "../images/goal_empty.svg";
import { useGoalsInSelectedScope } from "../store/goalSlice";
import { hidePopover, showPopover } from "../store/popoverSlice";
import { useSelectedScope } from "../store/scopeSlice";
import { View } from "./view";

export function Goals() {
  const scope = useSelectedScope();
  const goals = useGoalsInSelectedScope();
  const dispatch = useDispatch();

  function showNewGoalForm() {
    dispatch(
      showPopover({
        component: <GoalForm onClose={() => dispatch(hidePopover())} />,
      })
    );
  }

  return (
    <View title="Goals">
      <header className="flex justify-between items-center mb-[20px]">
        <Button text="Add Goal" onClick={showNewGoalForm} />
      </header>

      {goals.length ? (
        <section className="flex flex-wrap justify-between">
          {goals.map((goal) => (
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
