import { IGoal, SavedType } from "../data/couchModel";
import { useTrackingInGoal } from "../store/trackingSlice";

export function useGoalStats(goal: SavedType<IGoal>) {
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
