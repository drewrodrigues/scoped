import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Goal, IGoal, SavedType } from "../../data/couchModel";
import { goalDeleted } from "../../store/goalSlice";
import { trackingLoaded } from "../../store/trackingSlice";
import { GoalTrackingList } from "../tracking/goalTrackingList";
import { TrackingDuration } from "../tracking/trackingDuration";

export function GoalIndexItem({ ..._goal }: SavedType<IGoal>) {
  const goal = new Goal(_goal);
  const {
    timeUntilDue,
    totalDaysToComplete,
    averageMinutesPerDayNeeded,
    quantityShouldBeDone,
    daysLeftUntilDue,
  } = goal;
  const {
    coverPhotoUrl,
    title,
    dueDate,
    trackingMethod: trackingType,
    startDate,
    trackingGoalQuantity,
  } = goal.attributes;

  const dispatch = useDispatch();
  async function onDeleteGoalClick() {
    await goal.destroy();
    dispatch(goalDeleted({ goal: _goal }));
  }

  async function getTrackingForGoal() {
    const tracking = await goal.getTracking();
    dispatch(trackingLoaded({ values: tracking }));
    console.log({ tracking });
  }

  useEffect(() => {
    getTrackingForGoal();
  }, []);

  return (
    <div className="flex flex-col">
      <TrackingDuration goalId={goal.attributes._id} />
      <div
        key={goal.attributes._id}
        className="flex flex-col w-[400px] shrink-0 relative mr-[20px] hover:opacity-100 transition-opacity cursor-pointer mt-[20px]"
      >
        <img
          src={coverPhotoUrl}
          alt="Something goes here"
          className="w-full rounded-[10px] object-cover h-full"
        />

        <button
          onClick={onDeleteGoalClick}
          className="absolute top-[10px] right-[10px] bg-white py-[7px] px-[10px] rounded-[5px] text-[12px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        >
          Delete
        </button>

        <div>
          <p className="text-[14px] mt-[20px]">{title}</p>

          {dueDate && (
            <footer className="text-[12px]">{"due " + timeUntilDue}</footer>
          )}

          <p>Tracking Type: {trackingType}</p>
          {/* <p>isOnTrack: {isOnTrack ? "true" : "false"}</p>
        <p>TrackedQuantity: {trackedQuantity}</p> */}
          <p>Togo: {trackingGoalQuantity}</p>
          <p>Start: {startDate}</p>
          <p>Due Date: {dueDate}</p>
          <p>Total days to complete: {totalDaysToComplete}</p>
          <p>Days left to complete: {daysLeftUntilDue}</p>
          <p>
            averageMinutesPerDayNeeded:
            {averageMinutesPerDayNeeded}
          </p>
          <p>quantity should be done {quantityShouldBeDone}</p>
        </div>
      </div>

      <GoalTrackingList goalId={goal.attributes._id} />
    </div>
  );
}
