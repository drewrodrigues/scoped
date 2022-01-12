import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaBars, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { destroy, getChildren } from "../../data/modelCrud";
import {
  ISavedGoal,
  ISavedTracking,
  isTrackableGoal,
} from "../../data/modelTypes";
import { goalDeleted } from "../../store/goalSlice";
import { trackingLoaded } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { GoalTrackingList } from "../tracking/trackingList";
import { NewTrackingForm } from "../tracking/trackingForm";
import { GoalProgressBar } from "./goalProgressBar";

export function GoalIndexItem(goal: ISavedGoal) {
  const { title, _id, _rev, coverPhotoUrl, dueDate } = goal;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleTracking, setToggleTracking] = useState(false);

  const dispatch = useDispatch();
  async function onDeleteGoalClick() {
    await destroy({ _id: _id, _rev: _rev });
    dispatch(goalDeleted({ goalId: _id }));
  }

  async function getTrackingForGoal() {
    const tracking = await getChildren<ISavedTracking>(
      "Tracking",
      "goalId",
      _id
    );
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

        {isTrackableGoal(goal) && <GoalProgressBar goal={goal} />}

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
