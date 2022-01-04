import React from "react";
import { useDispatch } from "react-redux";
import { Goal, IGoal, SavedType } from "../data/couchModel";
import { goalDeleted, useGoalsInSelectedScope } from "../store/goalSlice";
import moment from "moment";
import { GoalForm } from "../components/goals/goalForm";

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
        {goals.map((goal, i) => {
          const goalModel = new Goal(goal);

          return (
            <div
              key={goal._id}
              className="flex flex-col w-[400px] shrink-0 h-[250px] relative mr-[20px] hover:opacity-100 transition-opacity cursor-pointer"
              style={{ opacity: `${100 - 35 * i}%` }}
            >
              <img
                src={goal.coverPhotoUrl}
                alt="Something goes here"
                className="w-full rounded-[10px] object-cover h-full"
              />

              <button
                onClick={() => onDeleteGoalClick(goal)}
                className="absolute top-[10px] right-[10px] bg-white py-[7px] px-[10px] rounded-[5px] text-[12px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Delete
              </button>

              <div>
                <p className="text-[14px] mt-[20px]">{goal.title}</p>

                {goal.dueDate && (
                  <footer className="text-[12px]">
                    {"due " + goalModel.timeUntilDue}
                  </footer>
                )}

                <p>Tracking Type: {goal.trackingType}</p>
                <p>isOnTrack: {goalModel.isOnTrack ? "true" : "false"}</p>
                <p>TrackedQuantity: {goalModel.trackedQuantity}</p>
                <p>Togo: {goalModel.attributes.trackingGoalQuantity}</p>
                <p>Start: {goalModel.attributes.startDate}</p>
                <p>Due Date: {goalModel.attributes.dueDate}</p>
                <p>Total days to complete: {goalModel.totalDaysToComplete}</p>
                <p>Days left to complete: {goalModel.daysLeftUntilDue}</p>
                <p>
                  averageMinutesPerDayNeeded:
                  {goalModel.averageMinutesPerDayNeeded}
                </p>
                <p>quantity should be done {goalModel.quantityShouldBeDone}</p>
              </div>
            </div>
          );
        })}
      </ul>
    </main>
  );
}
