import React from "react";
import moment from "moment";
import { SavedType } from "../../data/modelCrud";
import { useTrackingInGoal } from "../../store/trackingSlice";
import { ISavedTracking } from "../../data/modelTypes";
import { TrackingItem } from "./trackingItem";

interface GoalTrackingListProps {
  goalId: string;
}

export function GoalTrackingList({ goalId }: GoalTrackingListProps) {
  const trackingRecords = useTrackingInGoal(goalId);

  function editTracking(tracking: ISavedTracking) {}

  return (
    <_GoalTrackingList
      trackingRecords={trackingRecords}
      onTrackingClick={editTracking}
    />
  );
}

interface _GoalTrackingListProps {
  trackingRecords: ISavedTracking[];
  onTrackingClick?: (tracking: ISavedTracking) => void;
}

export function _GoalTrackingList({
  trackingRecords,
  onTrackingClick,
}: _GoalTrackingListProps) {
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
