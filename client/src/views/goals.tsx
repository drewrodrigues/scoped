import React, { useState } from "react";
import { GoalForm } from "../components/goals/goalForm";
import { GoalIndexItem } from "../components/goals/goalIndexItem";
import { Button } from "../components/shared/button";
import { useGoalsInSelectedScope } from "../store/goalSlice";
import { View } from "./view";
import GoalEmpty from "../images/goal_empty.svg";
import { useSelectedScope } from "../store/scopeSlice";

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
        <section className="rounded-[3px] flex items-center justify-center py-[75px] flex-col">
          <img src={GoalEmpty} className="w-[400px] mb-[50px]" />
          <h3 className="font-bold">
            Hmm, looks like you don't have any {scope?.title} goals yet
          </h3>
          <p className="text-[14px] mb-[20px]">Try adding your first one</p>
          <Button text="Add Goal" onClick={() => setShowGoalForm((p) => !p)} />
        </section>
      )}
    </View>
  );
}
