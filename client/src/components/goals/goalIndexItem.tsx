import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaBars, FaPen, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { destroy, getChildren } from "../../data/modelCrud";
import { ISavedGoal, ISavedTracking } from "../../data/modelTypes";
import { goalDeleted } from "../../store/goalSlice";
import { trackingLoaded, useTrackingInGoal } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { TrackingList } from "../tracking/trackingList";
import { NewTrackingForm } from "../tracking/trackingForm";
import { GoalProgressBar } from "./goalProgressBar";
import { GoalForm } from "./goalForm";

export function GoalIndexItem(goal: ISavedGoal) {
  const { title, _id, _rev, coverPhotoUrl, dueDate } = goal;
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleTracking, setToggleTracking] = useState(false);

  const [toggleGoalForm, setToggleGoalForm] = useState(false);

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

  useEffect(() => {
    getTrackingForGoal();
  }, []);

  return (
    <div className="flex flex-col w-[49%]">
      {toggleGoalForm && (
        <GoalForm
          existingGoal={goal}
          onClose={() => setToggleGoalForm(false)}
        />
      )}

      <section
        key={_id}
        className="flex flex-col shrink-0 relative hover:opacity-100 mt-[20px] mb-[10px] rounded-[5px]"
        style={{ boxShadow: "0 2px #eff2f3", border: "1px solid #EFF2F3" }}
      >
        <header className="relative">
          <div className="absolute top-[10px] right-[10px] flex flex-col items-end">
            <button
              className="bg-white py-[7px] px-[10px] mb-[5px] rounded-[5px] text-[12px] hover:opacity-100 cursor-pointer"
              onClick={() => setToggleMenu((p) => !p)}
            >
              <FaBars />
            </button>

            {toggleMenu && (
              <div className="bg-white rounded-[5px]">
                <button
                  className="text-[14px] px-[11px] py-[5px] flex items-center"
                  onClick={() => {
                    setToggleMenu(false);
                    setToggleGoalForm(true);
                  }}
                >
                  <FaPen className="mr-[3px] text-[12px]" />
                  Edit
                </button>

                <button
                  className="text-[14px] px-[11px] py-[5px] flex items-center"
                  onClick={onDeleteGoalClick}
                >
                  <FaTrash className="mr-[3px] text-[12px]" />
                  Delete
                </button>
              </div>
            )}
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
