import { createSlice } from "@reduxjs/toolkit";
import { ITracking, SavedType } from "../data/couchModel";
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

export const { trackingLoaded, trackingAdded } = trackingSlice.actions;

export default trackingSlice.reducer;
