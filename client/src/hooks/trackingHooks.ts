import { useDispatch } from "react-redux";
import { createOrSaveModel, SavedType } from "../data/modelCrud";
import { ITracking } from "../data/modelTypes";
import { trackingAdded } from "../store/trackingSlice";

export function useCreateTrackingOnGoal() {
  const dispatch = useDispatch();

  return async function ({
    quantity,
    date,
    goalId,
    callback,
  }: {
    quantity: string | number;
    date: string;
    goalId: string;
    callback: (newRecord: SavedType<ITracking>) => void;
  }) {
    const tracking = await createOrSaveModel<ITracking>("Tracking", {
      trackingMethod: "hours",
      value: typeof quantity === "number" ? quantity : parseInt(quantity),
      date,
      goalId,
    });

    dispatch(trackingAdded({ value: tracking }));
    callback(tracking);
  };
}
