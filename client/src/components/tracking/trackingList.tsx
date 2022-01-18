import React from "react";
import moment from "moment";
import { SavedType } from "../../data/modelCrud";
import { useTrackingInGoal } from "../../store/trackingSlice";
import { ISavedTracking } from "../../data/modelTypes";
import { TrackingItem } from "./trackingItem";

interface TrackingListProps {
  trackingRecords: ISavedTracking[];
}

export function TrackingList({ trackingRecords }: TrackingListProps) {
  return <_TrackingList trackingRecords={trackingRecords} />;
}

interface _TrackingListProps {
  trackingRecords: ISavedTracking[];
}

export function _TrackingList({ trackingRecords }: _TrackingListProps) {
  const maxValue = trackingRecords.reduce((max, record) => {
    if (record.value > max) {
      return record.value;
    } else {
      return max;
    }
  }, 0);

  return (
    <div className="flex mt-[10px]">
      {trackingRecords.map((tracking) => (
        <TrackingItem tracking={tracking} maxValueInList={maxValue} />
      ))}
    </div>
  );
}
