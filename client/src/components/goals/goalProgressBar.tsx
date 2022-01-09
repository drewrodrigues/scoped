import React from "react";
import { FaBullseye } from "react-icons/fa";
import {
  ISavedGoalTrackable,
  ISavedTracking,
  TrackingMethod,
} from "../../data/modelTypes";
import {
  actualGoalProgression,
  computedGoalDates,
  shouldBeGoalProgression,
} from "../../hooks/goalHooks";
import { useTrackingInGoal } from "../../store/trackingSlice";

interface GoalProgressBarProps {
  goal: ISavedGoalTrackable;
}

export function GoalProgressBar({ goal }: GoalProgressBarProps) {
  const tracking = useTrackingInGoal(goal._id);
  const {
    percentShouldBeComplete,
    quantityShouldBeComplete,
  } = shouldBeGoalProgression(goal);

  const {
    totalDaysForGoal,
    daysLeftUntilDue,
    wholeDaysLeft,
    daysIntoGoal,
  } = computedGoalDates(goal);

  const { quantityComplete, percentComplete } = actualGoalProgression(
    goal,
    tracking
  );

  return (
    <_GoalProgressBar
      percentShouldBeComplete={percentShouldBeComplete}
      quantityShouldBeComplete={quantityShouldBeComplete}
      quantityComplete={quantityComplete}
      trackingGoalQuantity={goal.trackingGoalQuantity}
      percentComplete={percentComplete}
      trackingType={goal.trackingMethod}
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
  quantityComplete: quantityCompleted,
  trackingGoalQuantity,
  trackingType,
}: _GoalProgressBarProps) {
  return (
    <section className="bg-gray-200 h-[30px] flex items-center justify-between relative">
      <div
        style={{ width: `${percentComplete || 0}%` }}
        className="bg-green-300 h-[30px] absolute opacity-70 z-0"
      />
      <div
        style={{ left: `${percentShouldBeComplete || 0}%` }}
        className="h-[15px] border-l-[1px] border-l-green-700 border-dashed absolute top-[25px] z-50 flex items-end"
      >
        <p className="text-[8px] whitespace-nowrap ml-[5px] leading-[1] flex">
          <FaBullseye className="mr-[3px]" />
          {percentShouldBeComplete}% / {quantityShouldBeComplete}
        </p>
      </div>

      <p className="text-green-800 relative z-10 text-[12px] ml-[7px]">
        {percentComplete || 0}%
      </p>

      <p className="text-gray-500 relative z-10 text-[12px] mr-[7px]">
        {quantityCompleted} / {trackingGoalQuantity} {trackingType}
      </p>
    </section>
  );
}
