import React, { useState } from "react";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";
import { Button } from "../components/shared/button";
import { useGoalsInSelectedScope } from "../store/goalSlice";
import { View } from "./view";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const [showGoalForm, setShowGoalForm] = useState<boolean>(false);
  const goals = useGoalsInSelectedScope();

  return (
    <View>
      <header className="flex justify-between items-center">
        <h3 className="font-bold text-[22px] mb-[20px]">Goals</h3>
        <Button text="Add Goal" onClick={() => setShowGoalForm((p) => !p)} />
      </header>

      {showGoalForm && <GoalForm onClose={() => setShowGoalForm(false)} />}

      <section className="flex flex-wrap justify-between">
        {goals.map((goal) => (
          <GoalIndexItem key={goal._id} {...goal} />
        ))}
      </section>
    </View>
  );
}
