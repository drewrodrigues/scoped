import React from "react";
import { useDispatch } from "react-redux";
import { Goal, IGoal, SavedType } from "../data/couchModel";
import { goalDeleted, useGoalsInSelectedScope } from "../store/goalSlice";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const goals = useGoalsInSelectedScope();

  return (
    <main className="p-[40px] overflow-y-scroll">
      <GoalForm />
      <h2 className="mb-[20px]">Goals</h2>
      <ul className="flex">
        {goals.map((goal) => (
          <GoalIndexItem key={goal._id} {...goal} />
        ))}
      </ul>
    </main>
  );
}
