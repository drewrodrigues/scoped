import moment from "moment";
import { IGoal, ISavedGoal, ISavedTracking } from "../data/modelTypes";
import { todaysDate } from "../helpers/date";

export function shouldBeGoalProgression(goal: ISavedGoal): {
  percentShouldBeComplete: number;
  quantityShouldBeComplete: number;
} {
  if (!goal.trackingGoalQuantity)
    throw new Error(
      "shouldBeGoalProgression(): No tracking goal quantity set on Goal"
    );

  const { totalDaysForGoal, daysIntoGoal } = computedGoalDates(goal);

  const percentShouldBeComplete = (daysIntoGoal / totalDaysForGoal) * 100;
  const quantityShouldBeComplete =
    (percentShouldBeComplete / 100) * goal.trackingGoalQuantity;

  return {
    percentShouldBeComplete: parseInt(percentShouldBeComplete.toFixed()),
    quantityShouldBeComplete: parseInt(quantityShouldBeComplete.toFixed()),
  };
}

export function computedGoalDates(goal: ISavedGoal): {
  totalDaysForGoal: number;
  daysLeftUntilDue: number;
  wholeDaysLeft: number;
  daysIntoGoal: number;
} {
  const totalDaysForGoal =
    moment(goal.dueDate).diff(goal.startDate, "days") + 1;
  const daysLeftUntilDue = moment(goal.dueDate).diff(todaysDate(), "days"); // to count today;
  const wholeDaysLeft = daysLeftUntilDue + 1;
  const daysIntoGoal = totalDaysForGoal - wholeDaysLeft;
  return { totalDaysForGoal, daysLeftUntilDue, wholeDaysLeft, daysIntoGoal };
}

export function actualGoalProgression(
  goal: IGoal,
  tracking: ISavedTracking[]
): {
  percentComplete: number;
  quantityComplete: number;
} {
  if (!goal.trackingGoalQuantity)
    throw new Error(
      "actualGoalProgression(): No tracking goal quantity set on Goal"
    );

  const quantityComplete = tracking.reduce(
    (total, track) => total + track.value,
    0
  );
  const percentComplete = (quantityComplete / goal.trackingGoalQuantity) * 100;

  return {
    percentComplete: parseInt(percentComplete.toFixed()),
    quantityComplete: parseInt(percentComplete.toFixed()),
  };
}

export function neededGoalProjections(
  goal: ISavedGoal,
  tracking: ISavedTracking
): {
  averageQuantityNeededPerDay: number;
} {
  return { averageQuantityNeededPerDay: 1 };
}
