import moment from "moment";
import {
  IGoal,
  IGoalTrackable,
  ITracking,
  SavedType,
} from "../data/couchModel";
import { todaysDate } from "../helpers/date";
import { useTrackingInGoal } from "../store/trackingSlice";

export function shouldBeGoalStats(goal: SavedType<IGoalTrackable>): {
  percentShouldBeComplete: number;
  quantityShouldBeComplete: number;
} {
  const { totalDaysForGoal, daysIntoGoal } = computedGoalDates(goal);

  const percentShouldBeComplete = (daysIntoGoal / totalDaysForGoal) * 100;
  const quantityShouldBeComplete =
    (percentShouldBeComplete / 100) * goal.trackingGoalQuantity;

  return { percentShouldBeComplete, quantityShouldBeComplete };
}

export function computedGoalDates(goal: SavedType<IGoal>): {
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

export function useActualGoalStats(
  goal: SavedType<IGoal>,
  tracking: SavedType<ITracking>[]
): {
  percentIsComplete: number;
  quantityIsComplete: number;
} {
  return { percentIsComplete: 0, quantityIsComplete: 0 };
}

export function useGoalProgressionStatus(
  goal: SavedType<IGoal>,
  tracking: SavedType<ITracking>[]
): {
  isOnTrack: boolean;
} {
  return { isOnTrack: false };
}

export function useNeededGoalProjections(
  goal: SavedType<IGoal>,
  tracking: SavedType<ITracking>[]
): {
  averageQuantityNeededPerDay: number;
} {
  return { averageQuantityNeededPerDay: 1 };
}

export function useGoalStats(goal: SavedType<IGoalTrackable>) {
  const tracking = useTrackingInGoal(goal._id);

  const quantityCompleted = tracking.reduce(
    (total, track) => total + track.value,
    0
  );

  return {
    // daysLeftUntilDue: 10,
    // averageQuantityNeededPerDay: 50,
    quantityCompleted,
    // percentComplete: 20 / 50,
  };
}
