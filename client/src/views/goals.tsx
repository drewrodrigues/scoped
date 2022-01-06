import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Goal, IGoal, SavedType } from "../data/couchModel";
import { goalDeleted, useGoalsInSelectedScope } from "../store/goalSlice";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";
import { Button } from "../components/shared/button";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const [showGoalForm, setShowGoalForm] = useState(true);
  const goals = useGoalsInSelectedScope();

  return (
    <main className="p-[40px] overflow-y-scroll w-full">
      <header className="flex justify-between items-center">
        <h2 className="mb-[20px]">Goals</h2>
        <Button text="Add Goal" onClick={() => setShowGoalForm((p) => !p)} />
      </header>

      {showGoalForm && <GoalForm onClose={() => setShowGoalForm(false)} />}

      <ul className="flex">
        {goals.map((goal) => (
          <GoalIndexItem key={goal._id} {...goal} />
        ))}
      </ul>
    </main>
  );
}
