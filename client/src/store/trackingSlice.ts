import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { ISavedTracking } from "../data/modelTypes";
import { RootState } from "./store";
import {
  sliceAdded,
  sliceDeleted,
  sliceLoaded,
  sliceUpdated,
} from "./_sliceHelper";

export interface TrackingState {
  trackingRecords: Record<string, ISavedTracking>;
}

const initialState: TrackingState = {
  trackingRecords: {},
};

export const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    trackingLoaded: sliceLoaded<TrackingState, ISavedTracking>(
      "trackingRecords"
    ),
    trackingAdded: sliceAdded<TrackingState, ISavedTracking>("trackingRecords"),
    trackingDeleted: sliceDeleted<TrackingState, ISavedTracking>(
      "trackingRecords"
    ),
    trackingUpdated: sliceUpdated<TrackingState, ISavedTracking>(
      "trackingRecords"
    ),
  },
});

export function useTrackingInGoal(goalId: string): ISavedTracking[] {
  const allTracking = useSelector(
    (state: RootState) => state.tracking.trackingRecords
  );
  const filteredTracking = [];

  for (const [_, trackingRecord] of Object.entries(allTracking)) {
    if (trackingRecord.goalId === goalId) {
      filteredTracking.push(trackingRecord);
    }
  }

  return filteredTracking;
}

export const { trackingLoaded, trackingAdded } = trackingSlice.actions;

export default trackingSlice.reducer;
