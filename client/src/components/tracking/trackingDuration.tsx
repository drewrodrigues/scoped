import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Tracking } from "../../data/couchModel";
import { trackingAdded } from "../../store/trackingSlice";

interface TrackingDurationProps {
  goalId: string;
}

export function TrackingDuration({ goalId }: TrackingDurationProps) {
  const dispatch = useDispatch();

  const [trackingDuration, setTrackingDuration] = useState<string>("");

  async function createTrackingOnGoal() {
    const tracking = new Tracking({
      trackingMethod: "hours",
      value: parseInt(trackingDuration),
      createdOn: new Date().toUTCString(),
      goalId,
    });
    const newTracking = await tracking.save();

    dispatch(trackingAdded({ value: newTracking }));
    console.log({ newTracking });
  }

  return (
    <div className="flex items-start">
      <h2>Tracking duration</h2>
      <input
        type="number"
        value={trackingDuration}
        onChange={(e) => setTrackingDuration(e.target.value)}
        placeholder="hours"
      />
      <button
        className="bg-green-700 text-white"
        onClick={createTrackingOnGoal}
      >
        Add Tracking
      </button>
    </div>
  );
}
