import moment from "moment";
import { IGoal, ISavedGoal, ISavedTracking } from "../data/modelTypes";
import { todaysDate } from "../helpers/date";

export function shouldBeGoalProgression(goal: ISavedGoal): {
  percentShouldBeComplete: number;
  quantityShouldBeComplete: number;
  percentShouldBeCompleteFormatted: number;
  quantityShouldBeCompleteFormatted: number;
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
    percentShouldBeComplete: Math.min(percentShouldBeComplete, 100),
    quantityShouldBeComplete: Math.min(
      quantityShouldBeComplete,
      goal.trackingGoalQuantity
    ),
    percentShouldBeCompleteFormatted: Math.min(
      parseInt(percentShouldBeComplete.toFixed()),
      100
    ),
    quantityShouldBeCompleteFormatted: Math.min(
      parseInt(quantityShouldBeComplete.toFixed()),
      goal.trackingGoalQuantity
    ),
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
  return {
    totalDaysForGoal,
    daysLeftUntilDue,
    wholeDaysLeft,
    daysIntoGoal,
  };
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
    percentComplete: Math.min(parseInt(percentComplete.toFixed()), 100),
    quantityComplete: parseInt(quantityComplete.toFixed()),
  };
}

export function neededGoalProjections(
  goal: ISavedGoal,
  tracking: ISavedTracking[]
): {
  averageNeededPerDay: number;
  neededToBeOnTrack: number;
  isOnTrack: boolean;
  neededToBeOnTrackFormatted: string;
} {
  const { totalDaysForGoal } = computedGoalDates(goal);
  const { quantityComplete } = actualGoalProgression(goal, tracking);
  const { quantityShouldBeComplete } = shouldBeGoalProgression(goal);

  const averageNeededPerDay = goal.trackingGoalQuantity! / totalDaysForGoal;
  const neededToBeOnTrack = quantityShouldBeComplete - quantityComplete;
  const neededToBeOnTrackFormatted = neededToBeOnTrack.toFixed(2);

  const isOnTrack =
    quantityComplete >= quantityShouldBeComplete - averageNeededPerDay;

  return {
    averageNeededPerDay,
    neededToBeOnTrack,
    isOnTrack,
    neededToBeOnTrackFormatted,
  };
}

export function goalsTodayQuantities(goals: ISavedGoal[]) {
  const goalsDismissedCount = goals.reduce((total, goal) => {
    if (
      goal.lastDismissed &&
      moment(goal.lastDismissed).isSame(todaysDate(), "day")
    ) {
      return total + 1;
    } else {
      return total;
    }
  }, 0);

  const isAllGoalsDismissed = goalsDismissedCount === goals.length;
  const goalsLeft = goals.length - goalsDismissedCount;

  return { goalsLeft, isAllGoalsDismissed, goalsDismissedCount };
}
