import React from "react";
import { FaBullseye, FaCheck } from "react-icons/fa";
import { ISavedGoal, TrackingMethod } from "../../data/modelTypes";
import {
  actualGoalProgression,
  computedGoalDates,
  shouldBeGoalProgression,
} from "../../hooks/goalHooks";
import { useTrackingInGoal } from "../../store/trackingSlice";

interface GoalProgressBarProps {
  goal: ISavedGoal;
}

export function GoalProgressBar({ goal }: GoalProgressBarProps) {
  const tracking = useTrackingInGoal(goal._id);
  const { percentShouldBeComplete, quantityShouldBeComplete } =
    shouldBeGoalProgression(goal);

  const { totalDaysForGoal, daysLeftUntilDue, wholeDaysLeft, daysIntoGoal } =
    computedGoalDates(goal);

  const { quantityComplete, percentComplete } = actualGoalProgression(
    goal,
    tracking
  );

  return (
    <_GoalProgressBar
      percentShouldBeComplete={percentShouldBeComplete}
      quantityShouldBeComplete={quantityShouldBeComplete}
      quantityComplete={quantityComplete}
      trackingGoalQuantity={goal.trackingGoalQuantity!}
      percentComplete={percentComplete}
      trackingType={goal.trackingMethod!}
    />
  );
}

interface _GoalProgressBarProps {
  percentComplete: number;
  percentShouldBeComplete: number;
  quantityShouldBeComplete: number;
  quantityComplete: number;
  trackingGoalQuantity: number;
  trackingType: TrackingMethod;
}

export function _GoalProgressBar({
  percentComplete,
  percentShouldBeComplete,
  quantityShouldBeComplete,
  quantityComplete,
  trackingGoalQuantity,
  trackingType,
}: _GoalProgressBarProps) {
  return (
    <main className="w-full">
      <div className="flex justify-between h-[20px] items-center">
        <div
          style={{ width: `${percentComplete || 0}%` }}
          className="bg-green-300 h-[20px] z-10 flex justify-center items-center absolute"
        />

        <p className="relative text-[8px] ml-[7px] whitespace-nowrap z-20 flex items-center">
          <FaCheck className="mr-[3px]" />
          {percentComplete || 0}% / {quantityComplete}
        </p>

        <p className="text-[8px] mr-[7px] relative z-20">
          {trackingGoalQuantity} {trackingType}
        </p>
      </div>

      <div
        style={{ width: `${percentShouldBeComplete || 0}%` }}
        className="flex justify-between h-[20px] items-center bg-orange-200"
      >
        <p className="text-[8px] whitespace-nowrap ml-[5px] leading-[1] flex">
          <FaBullseye className="mr-[3px]" />
          {percentShouldBeComplete}% / {quantityShouldBeComplete}
        </p>
      </div>
    </main>
  );
}
