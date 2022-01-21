import React, { useState } from "react";
import { EmptyState } from "../components/emptyState";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";
import { Button } from "../components/shared/button";
import GoalEmpty from "../images/goal_empty.svg";
import { useGoalsInSelectedScope } from "../store/goalSlice";
import { useSelectedScope } from "../store/scopeSlice";
import { View } from "./view";

export function Goals() {
  const scope = useSelectedScope();
  const [showGoalForm, setShowGoalForm] = useState<boolean>(false);
  const goals = useGoalsInSelectedScope();

  return (
    <View>
      <header className="flex justify-between items-center mb-[20px]">
        <h3 className="font-bold text-[22px]">Goals</h3>
        <Button text="Add Goal" onClick={() => setShowGoalForm((p) => !p)} />
      </header>

      {showGoalForm && <GoalForm onClose={() => setShowGoalForm(false)} />}

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
          <Button text="Add Goal" onClick={() => setShowGoalForm((p) => !p)} />
        </EmptyState>
      )}
    </View>
  );
}
