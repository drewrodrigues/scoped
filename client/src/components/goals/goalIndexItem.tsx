import moment from "moment";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaBars, FaPen, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { destroy, getChildren } from "../../data/modelCrud";
import { ISavedGoal, ISavedTracking } from "../../data/modelTypes";
import { goalDeleted } from "../../store/goalSlice";
import { trackingLoaded, useTrackingInGoal } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { TrackingList } from "../tracking/trackingList";
import { NewTrackingForm } from "../tracking/trackingForm";
import { GoalProgressBar } from "./goalProgressBar";
import { GoalForm } from "./goalForm";
import { hidePopover, showPopover } from "../../store/popoverSlice";
import { RootState } from "../../store/store";
import classNames from "classnames";

export function GoalIndexItem(goal: ISavedGoal) {
  const { title, _id, _rev, coverPhotoUrl, dueDate } = goal;
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

  async function getTrackingForGoal() {
    const tracking = await getChildren<ISavedTracking>(
      "Tracking",
      "goalId",
      _id
    );
    dispatch(trackingLoaded({ values: tracking }));
    console.log({ tracking });
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

          {goal.trackingMethod && (
            <footer className="absolute bottom-[10px] right-[10px]">
              <Button
                text="Track"
                onClick={() => setToggleTracking((p) => !p)}
              />
            </footer>
          )}
        </header>

        <footer className="p-[20px] bg-white justify-between items-center relative">
          <p className="text-[16px] text-bold text-gray-700 w-full font-bold">
            {title}
          </p>

          {trackingRecords.length ? (
            <TrackingList trackingRecords={trackingRecords} />
          ) : null}
        </footer>

        {goal.trackingMethod && <GoalProgressBar goal={goal} />}
      </section>
      <p className="rounded-[5px] text-[10px] text-gray-500">
        due in{" "}
        <span className="font-bold">{moment(dueDate).fromNow(true)}</span> on{" "}
        {moment(dueDate).format("MM/DD/YY")}
      </p>
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
