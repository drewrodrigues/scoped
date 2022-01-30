import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaAward, FaBars, FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createOrSaveModel, destroy, getChildren } from "../../data/modelCrud";
import { ISavedGoal, ISavedTracking } from "../../data/modelTypes";
import { todaysDate } from "../../helpers/date";
import { getGoalStatus, GoalStatus } from "../../utils/goalUtils";
import { goalDeleted, goalUpdated } from "../../store/goalSlice";
import { hidePopover, showPopover } from "../../store/popoverSlice";
import { RootState } from "../../store/store";
import { trackingLoaded, useTrackingInGoal } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { NewTrackingForm } from "../tracking/trackingForm";
import { TrackingList } from "../tracking/trackingList";
import { GoalForm } from "./goalForm";
import { GoalProgressBar } from "./goalProgressBar";

export function GoalIndexItem(goal: ISavedGoal) {
  const {
    title,
    _id,
    _rev,
    coverPhotoUrl,
    dueDate,
    finishingState,
    startDate,
  } = goal;
  const goalStatus = getGoalStatus(goal);
  const [toggleTracking, setToggleTracking] = useState(false);
  const isPoppedOver = useSelector(
    (state: RootState) => state.popover.element?.popoverId === goal._id
  );

  const trackingRecords = useTrackingInGoal(goal._id);

  const dispatch = useDispatch();
  async function onDeleteGoalClick() {
    await destroy({ _id: _id, _rev: _rev });
    dispatch(goalDeleted({ goalId: _id }));
  }

  async function onMarkFailedClick() {
    const updatedGoal = await createOrSaveModel<ISavedGoal>("Goal", {
      ...goal,
      finishingState: {
        date: todaysDate().toISOString(),
        status: "failed",
      },
    });
    dispatch(goalUpdated({ goal: updatedGoal }));
  }

  async function onMarkCompleteClick() {
    const updatedGoal = await createOrSaveModel<ISavedGoal>("Goal", {
      ...goal,
      finishingState: {
        date: todaysDate().toISOString(),
        status: "completed",
      },
    });
    dispatch(goalUpdated({ goal: updatedGoal }));
  }

  async function onUnmarkFinished() {
    const updatedGoal = await createOrSaveModel<ISavedGoal>("Goal", {
      ...goal,
      finishingState: undefined,
    });
    dispatch(goalUpdated({ goal: updatedGoal }));
  }

  async function getTrackingForGoal() {
    const tracking = await getChildren<ISavedTracking>(
      "Tracking",
      "goalId",
      _id
    );
    dispatch(trackingLoaded({ values: tracking }));
  }

  function showGoalContextMenu(e: React.MouseEvent<HTMLButtonElement>) {
    dispatch(
      showPopover({
        x: e.clientX,
        y: e.clientY,
        editAction: () => {
          dispatch(
            showPopover({
              component: (
                <GoalForm
                  existingGoal={goal}
                  onClose={() => {
                    dispatch(hidePopover());
                  }}
                />
              ),
            })
          );
        },
        deleteAction: onDeleteGoalClick,
        customActions: [
          {
            label: "Unmark Finished",
            action: onUnmarkFinished,
            Icon: FaCheck,
          },
          {
            label: "Mark Complete",
            action: onMarkCompleteClick,
            Icon: FaCheck,
          },
          {
            label: "Mark Failed",
            action: onMarkFailedClick,
            Icon: FaTimes,
          },
        ],
        popoverId: goal._id,
      })
    );
  }

  useEffect(() => {
    getTrackingForGoal();
  }, []);

  return (
    <div className="flex flex-col w-[49%]">
      <section
        key={_id}
        className={classNames(
          "flex flex-col shrink-0 relative mt-[20px] mb-[10px] rounded-[5px]",
          { "z-40 relative": isPoppedOver }
        )}
        style={{ boxShadow: "0 2px #eff2f3", border: "1px solid #EFF2F3" }}
      >
        <header className="relative">
          <div className="absolute top-[10px] right-[10px] flex flex-col items-end">
            <button
              className="bg-white py-[7px] px-[10px] mb-[5px] rounded-[5px] text-[12px] cursor-pointer"
              onClick={showGoalContextMenu}
            >
              <FaBars />
            </button>
          </div>
          <img
            src={coverPhotoUrl}
            alt="Something goes here"
            className="w-full object-cover h-[300px] rounded-t-[5px]"
          />

          {goalStatus === GoalStatus.InProgress && goal.trackingMethod && (
            <footer className="absolute bottom-[10px] right-[10px]">
              <Button
                text="Track"
                onClick={() => setToggleTracking((p) => !p)}
              />
            </footer>
          )}
        </header>

        <footer className="p-[20px] bg-white relative flex items-start flex-col">
          <p className="text-[16px] text-bold text-gray-700 w-full font-bold">
            {title}
          </p>

          {finishingState?.status === "failed" && (
            <p className="border rounded-[3px] text-[11px] mt-[5px] p-[5px] text-red-600 bg-red-100 border-red-200 flex items-center">
              <FaTimes className="mr-[3px]" />
              Marked failed on {moment(finishingState.date).format("MM/DD/YY")}
            </p>
          )}

          {finishingState?.status === "completed" && (
            <p className="border rounded-[3px] text-[11px] mt-[5px] p-[5px] text-green-600 bg-green-100 border-green-200 flex items-center">
              <FaAward className="mr-[3px]" />
              Marked complete on{" "}
              {moment(finishingState.date).format("MM/DD/YY")}
            </p>
          )}

          {goalStatus === GoalStatus.InProgress && trackingRecords.length ? (
            <TrackingList trackingRecords={trackingRecords} />
          ) : null}
        </footer>

        {goalStatus === GoalStatus.InProgress && goal.trackingMethod && (
          <GoalProgressBar goal={goal} />
        )}
      </section>

      {(goalStatus === GoalStatus.InProgress ||
        goalStatus === GoalStatus.Upcoming) && (
        <p className="rounded-[5px] text-[10px] text-gray-500">
          {goalStatus === GoalStatus.InProgress ? "due in" : "starting in"}{" "}
          <span className="font-bold">
            {moment(
              goalStatus === GoalStatus.InProgress ? dueDate : startDate
            ).fromNow(true)}
          </span>{" "}
          on{" "}
          {moment(
            goalStatus === GoalStatus.InProgress ? dueDate : startDate
          ).format("MM/DD/YY")}
        </p>
      )}

      {toggleTracking && goal.trackingMethod && (
        <NewTrackingForm
          trackingMethod={goal.trackingMethod}
          goalId={_id}
          onTrackingComplete={() => setToggleTracking(false)}
        />
      )}
    </div>
  );
}
