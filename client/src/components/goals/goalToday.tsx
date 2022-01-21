import classNames from "classnames";
import moment from "moment";
import React, { useState } from "react";
import { FaArrowRight, FaCheck, FaEyeSlash, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createOrSaveModel, destroy } from "../../data/modelCrud";
import { ISavedGoal } from "../../data/modelTypes";
import { todaysDate } from "../../helpers/date";
import { neededGoalProjections } from "../../hooks/goalHooks";
import { useCreateTrackingOnGoal } from "../../hooks/trackingHooks";
import { goalUpdated } from "../../store/goalSlice";
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
  const createTracking = useCreateTrackingOnGoal();
  const tracking = useTrackingInGoal(goal._id);
  const { neededToBeOnTrack, isOnTrack } = neededGoalProjections(
    goal,
    tracking
  );

  const lastTrackedDate = tracking[tracking.length - 1]?.date;
  const wasTrackedToday =
    lastTrackedDate && moment(lastTrackedDate).isSame(todaysDate(), "day");
  const wasDismissedToday =
    goal.lastDismissed &&
    moment(goal.lastDismissed).isSame(todaysDate(), "day");

  async function dismissGoalForDay(goal: ISavedGoal) {
    const updatedGoal = await createOrSaveModel<ISavedGoal>("Goal", {
      ...goal,
      lastDismissed: todaysDate().toUTCString(),
    });
    dispatch(goalUpdated({ goal: updatedGoal }));
  }

  if (wasDismissedToday && !showDismissed) return null;

  return (
    <>
      <li
        className={classNames(
          "border mb-[10px] flex items-center bg-white rounded-[5px] overflow-hidden",
          { "opacity-20": wasTrackedToday }
        )}
        style={{ boxShadow: "0 2px #eff2f3", border: "1px solid #EFF2F3" }}
      >
        <img src={goal.coverPhotoUrl} alt="" className="h-[75px]" />
        <section className="flex justify-between w-full px-[20px] text-[14px] items-center">
          <main className="leading-[1]">
            <p className="font-bold mb-[5px]">{goal.title}</p>

            <p className="rounded-[5px] text-[10px] text-gray-500 mb-[5px]">
              due in{" "}
              <span className="font-bold">
                {moment(goal.dueDate).fromNow(true)}
              </span>{" "}
              on {moment(goal.dueDate).format("MM/DD/YY")}
            </p>

            {goal.trackingMethod && (
              <div className="flex flex-col items-start">
                {isOnTrack ? (
                  <p className="text-[10px] flex px-[7px] py-[5px] border rounded-[5px] bg-green-400 text-green-900 whitespace-pre">
                    <FaCheck className="mr-[3px]" />
                    On Track
                    <span className="font-bold">
                      {" "}
                      {neededToBeOnTrack} due today
                    </span>
                  </p>
                ) : (
                  <p className="text-[10px] flex px-[7px] py-[5px] border rounded-[5px] bg-red-400 text-red-900 whitespace-pre">
                    <FaTimes className="mr-[3px]" />
                    Falling Behind
                    <span className="font-bold"> by {neededToBeOnTrack}</span>
                  </p>
                )}
              </div>
            )}
          </main>

          <aside className="flex">
            {goal.trackingMethod && (
              <Button
                text="Track"
                onClick={() => setToggleTracking((p) => !p)}
              />
            )}

            <Button
              onClick={() => dismissGoalForDay(goal)}
              className="ml-[5px]"
            >
              <FaEyeSlash />
            </Button>
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
