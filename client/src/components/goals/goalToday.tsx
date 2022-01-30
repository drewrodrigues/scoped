import classNames from "classnames";
import moment from "moment";
import React, { useState } from "react";
import {
  FaCheck,
  FaEllipsisV,
  FaEye,
  FaEyeSlash,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { createOrSaveModel, destroy } from "../../data/modelCrud";
import { ISavedGoal } from "../../data/modelTypes";
import { todaysDate, yesterdaysDate } from "../../helpers/date";
import { neededGoalProjections } from "../../utils/goalUtils";
import { useCreateTrackingOnGoal } from "../../utils/trackingHooks";
import { goalUpdated } from "../../store/goalSlice";
import { showPopover } from "../../store/popoverSlice";
import { RootState } from "../../store/store";
import { useTrackingInGoal } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { NewTrackingForm } from "../tracking/trackingForm";

interface GoalTodayProps {
  goal: ISavedGoal;
  showDismissed: boolean;
}

export function GoalToday({ goal, showDismissed }: GoalTodayProps) {
  const dispatch = useDispatch();
  const [toggleTracking, setToggleTracking] = useState(false);
  const tracking = useTrackingInGoal(goal._id);
  const { neededToBeOnTrackFormatted, isOnTrack } = neededGoalProjections(
    goal,
    tracking
  );

  const isPoppedOver = useSelector(
    (state: RootState) => state.popover.element?.popoverId === goal._id
  );

  const wasDismissedToday =
    goal.lastDismissed &&
    moment(goal.lastDismissed).isSame(todaysDate(), "day");

  async function dismissGoalForDay() {
    const updatedGoal = await createOrSaveModel<ISavedGoal>("Goal", {
      ...goal,
      lastDismissed: todaysDate().toUTCString(),
    });
    dispatch(goalUpdated({ goal: updatedGoal }));
  }

  async function undismissGoalForDay() {
    const updatedGoal = await createOrSaveModel<ISavedGoal>("Goal", {
      ...goal,
      lastDismissed: yesterdaysDate().toUTCString(),
    });
    dispatch(goalUpdated({ goal: updatedGoal }));
  }

  function showContextMenu(e: React.MouseEvent<HTMLElement>) {
    dispatch(
      showPopover({
        editAction: () => console.log("edit"),
        deleteAction: () => console.log("delete"),
        x: e.clientX,
        y: e.clientY,
        popoverId: goal._id,
      })
    );
  }

  if (wasDismissedToday && !showDismissed) return null;

  return (
    <>
      <li
        className={classNames(
          "border mb-[10px] flex items-center bg-white rounded-[5px] overflow-hidden",
          { "opacity-30": wasDismissedToday, "z-40 relative": isPoppedOver }
        )}
      >
        <div className="w-[50px] h-[75px] flex-shrink-0">
          <img
            src={goal.coverPhotoUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <section className="flex justify-between w-full px-[10px] text-[14px] items-center">
          <main className="leading-[1]">
            <p className="font-bold mb-[5px]">{goal.title}</p>

            <div className="flex items-center">
              {goal.trackingMethod &&
                (isOnTrack ? (
                  <p className="text-[8px] flex px-[7px] py-[5px] border rounded-[5px] text-green-500 whitespace-pre border-green-500">
                    <FaCheck className="mr-[3px]" />
                    <span className="font-bold">
                      {" "}
                      ~{neededToBeOnTrackFormatted} due today
                    </span>
                  </p>
                ) : (
                  <p className="text-[8px] flex px-[7px] py-[5px] border rounded-[5px] text-red-500 whitespace-pre border-red-500">
                    <FaTimes className="mr-[3px]" />
                    Behind
                    <span className="font-bold">
                      {" "}
                      by ~{neededToBeOnTrackFormatted}
                    </span>
                  </p>
                ))}
              <p className="rounded-[5px] text-[8px] text-gray-500 ml-[5px]">
                due in{" "}
                <span className="font-bold">
                  {moment(goal.dueDate).fromNow(true)}
                </span>{" "}
                on {moment(goal.dueDate).format("MM/DD/YY")}
              </p>
            </div>
          </main>

          <aside className="flex">
            {goal.trackingMethod && !wasDismissedToday && (
              <button onClick={() => setToggleTracking((p) => !p)}>
                <FaPlus />
              </button>
            )}

            {wasDismissedToday ? (
              <button
                onClick={() => undismissGoalForDay()}
                className="ml-[5px]"
              >
                <FaEye />
              </button>
            ) : (
              <button onClick={() => dismissGoalForDay()} className="ml-[5px]">
                <FaEyeSlash />
              </button>
            )}

            <button className="ml-[5px]" onClick={showContextMenu}>
              <FaEllipsisV />
            </button>
          </aside>
        </section>
      </li>
      {toggleTracking && goal.trackingMethod && (
        <NewTrackingForm
          trackingMethod={goal.trackingMethod}
          goalId={goal._id}
          onTrackingComplete={() => setToggleTracking(false)}
        />
      )}
    </>
  );
}
