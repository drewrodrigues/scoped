import React, { useState } from "react";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";
import { Button } from "../components/shared/button";
import { useGoalsInSelectedScope } from "../store/goalSlice";
import { View } from "./view";
import GoalEmpty from "../images/goal_empty.svg";
import { useSelectedScope } from "../store/scopeSlice";
import { EmptyState } from "../components/emptyState";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const [showGoalForm, setShowGoalForm] = useState<boolean>(false);
  const scope = useSelectedScope();
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
          title={`Hmm, looks like you don't have any $scope?.title} goals yet`}
          subtitle="Try adding your first one"
        >
          <Button text="Add Goal" onClick={() => setShowGoalForm((p) => !p)} />
        </EmptyState>
      )}
    </View>
  );
}
