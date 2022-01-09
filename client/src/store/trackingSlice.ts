import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { ITracking, SavedType } from "../data/modelCrud";
import { RootState } from "./store";
import {
  sliceAdded,
  sliceDeleted,
  sliceLoaded,
  sliceUpdated,
} from "./_sliceHelper";

export interface TrackingState {
  trackingRecords: Record<string, SavedType<ITracking>>;
}

const initialState: TrackingState = {
  trackingRecords: {},
};

export const trackingSlice = createSlice({
  name: "tracking",
  initialState,
  reducers: {
    trackingLoaded: sliceLoaded<TrackingState, SavedType<ITracking>>(
      "trackingRecords"
    ),
    trackingAdded: sliceAdded<TrackingState, SavedType<ITracking>>(
      "trackingRecords"
    ),
    trackingDeleted: sliceDeleted<TrackingState, SavedType<ITracking>>(
      "trackingRecords"
    ),
    trackingUpdated: sliceUpdated<TrackingState, SavedType<ITracking>>(
      "trackingRecords"
    ),
  },
});

export function useTrackingInGoal(goalId: string) {
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
