import React from "react";
import moment from "moment";
import { ITracking, SavedType } from "../../data/couchModel";
import { useTrackingInGoal } from "../../store/trackingSlice";

interface GoalTrackingListProps {
  goalId: string;
}

export function GoalTrackingList({ goalId }: GoalTrackingListProps) {
  const trackingRecords = useTrackingInGoal(goalId);

  return <_GoalTrackingList trackingRecords={trackingRecords} />;
}

interface _GoalTrackingListProps {
  trackingRecords: SavedType<ITracking>[];
}

export function _GoalTrackingList({ trackingRecords }: _GoalTrackingListProps) {
  const maxValue = trackingRecords.reduce((max, record) => {
    if (record.value > max) {
      return record.value;
    } else {
      return max;
    }
  }, 0);

  console.log({ trackingRecords });
  return (
    <>
      MaxValue: {maxValue}
      {/* TODO: make the date format configurable */}
      <div className="flex">
        {trackingRecords.map((tracking) => (
          <div className="flex flex-col">
            <div className="bg-white rounded-[5px] mb-[5px] mr-[5px] h-[100px] border w-[20px] bg-green flex items-end border-green-300 overflow-hidden">
              <div
                className="w-full bg-green-400 flex items-end justify-center text-green-900"
                style={{ height: `${(tracking.value / maxValue) * 100}%` }}
              >
                <p className="text-[10px]">{tracking.value}</p>
              </div>
            </div>
            <p className="text-[8px] text-center">
              {moment(tracking.createdOn).format("M/D")}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
