import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Cleave from "cleave.js/react";
import { FaCross, FaPlus, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getPhotoListFromTerm } from "../../external/unsplashApi";
import { goalCreated } from "../../store/goalSlice";
import { useSelectedScope } from "../../store/scopeSlice";
import { Button } from "../shared/button";
import { Radio } from "../shared/radio";
import { Input } from "../shared/input";
import { IGoal, IGoalTrackable, TrackingMethod } from "../../data/modelTypes";
import { createOrSaveModel } from "../../data/modelCrud";

interface GoalFormProps {
  onClose: () => void;
}

export function GoalForm({ onClose: onCloseProp }: GoalFormProps) {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();

  const [goalTitle, setGoalTitle] = useState("");
  const [goalStartDate, setGoalStartDate] = useState("");
  const [goalTrackingType, setGoalTrackingType] = useState<
    "none" | TrackingMethod
  >("none");
  const [goalDueDate, setGoalDueDate] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [trackingGoalQuantity, setTrackingGoalQuantity] = useState(0);

  const [coverPhotoSearch, setCoverPhotoSearch] = useState("");
  const [coverPhotos, setCoverPhotos] = useState<string[]>([]);

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(async () => {
      if (!coverPhotoSearch.length) return;
      const response = await getPhotoListFromTerm(coverPhotoSearch);
      setCoverPhotos(response);
      console.log({ response });
    }, 500);
    return () => clearTimeout(timeout);
  }, [coverPhotoSearch]);

  async function createGoalOnClick() {
    console.log({ selectedScope });
    const goal = new Goal({
      title: goalTitle,
      trackingMethod: goalTrackingType,
      startDate: goalStartDate,
      dueDate: goalDueDate,
      coverPhotoUrl,
      scopeId: selectedScope!._id,
      trackingGoalQuantity,
    });
    const savedGoal = await goal.save();
    dispatch(goalCreated({ goal: savedGoal }));
    setGoalTitle("");
    onCloseProp();
  }

  function onClose(e: any) {
    if (e.target != e.currentTarget) return;
    onCloseProp();
  }

  return (
    <div
      className="absolute left-0 right-0 top-0 bottom-0 z-50 bg-[rgba(0,0,0,0.75)] flex justify-center items-center"
      onClick={onClose}
    >
      <div className="flex flex-col p-[40px] bg-white rounded-[10px] shadow w-[400px] flex-shrink-0">
        <Input
          type="text"
          value={goalTitle}
          onChange={(value) => setGoalTitle(value)}
          placeholder="Spend 40 hours learning Spanish"
          label="Title"
        />

        <Input
          type="date"
          value={goalStartDate}
          onChange={(value) => setGoalStartDate(value)}
          label="Start Date"
        />

        <Input
          type="date"
          value={goalDueDate}
          onChange={(value) => setGoalDueDate(value)}
          label="Due Date"
        />

        <Input
          onChange={setCoverPhotoSearch}
          value={coverPhotoSearch}
          placeholder="Search"
          label="Cover Photo"
        />

        {coverPhotos.length ? (
          <div className="flex overflow-x-scroll h-[100px]">
            {coverPhotos.map((photoUrl) => (
              <img
                src={photoUrl}
                className={classNames("cover-photo-option", {
                  "border-green-400 border-[5px]": coverPhotoUrl === photoUrl,
                })}
                onClick={() => setCoverPhotoUrl(photoUrl)}
              />
            ))}
          </div>
        ) : (
          <div className="h-[100px] w-full bg-gray-300 text-white flex items-center justify-center">
            No Cover Photo Selected
          </div>
        )}

        <h4 className="mb-[5px] block text-[13px] mt-[10px]">Tracking Type</h4>
        <div className="flex mb-[10px]">
          <Radio
            name="None"
            value="none"
            checkedValue={goalTrackingType}
            onClick={(value) => setGoalTrackingType(value as TrackingMethod)}
          />

          <Radio
            name="Yes/No"
            value="yes/no"
            checkedValue={goalTrackingType}
            onClick={(value) => setGoalTrackingType(value as TrackingMethod)}
          />

          <Radio
            name="Hours"
            value="hours"
            checkedValue={goalTrackingType}
            onClick={(value) => setGoalTrackingType(value as TrackingMethod)}
          />
        </div>

        {goalTrackingType !== "none" && (
          <Input
            label={`Goal ${goalTrackingType}`}
            value={trackingGoalQuantity}
            onChange={(value) => setTrackingGoalQuantity(value)}
            placeholder="50"
            type="number"
          />
        )}

        <Button onClick={createGoalOnClick} text="Create Goal" />
      </div>
    </div>
  );
}
