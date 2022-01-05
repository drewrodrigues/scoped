import React from "react";
import { useDispatch } from "react-redux";
import { Goal, IGoal, SavedType } from "../data/couchModel";
import { goalDeleted, useGoalsInSelectedScope } from "../store/goalSlice";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const dispatch = useDispatch();
  const goals = useGoalsInSelectedScope();

  async function onDeleteGoalClick(goal: SavedType<IGoal>) {
    const savedGoal = new Goal(goal);
    await savedGoal.destroy();
    dispatch(goalDeleted({ goal }));
  }

  return (
    <main className="pt-[20px] pl-[20px]">
      <GoalForm />
      <h2 className="mb-[20px]">Goals</h2>
      <ul className="flex">
        {goals.map((goal) => (
          <GoalIndexItem
            key={goal._id}
            {...goal}
            onDeleteGoalClick={onDeleteGoalClick}
          />
        ))}
      </ul>
    </main>
  );
}
