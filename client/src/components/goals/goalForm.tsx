import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createOrSaveModel } from "../../data/modelCrud";
import { IGoal, ISavedGoal, TrackingMethod } from "../../data/modelTypes";
import { getPhotoListFromTerm } from "../../external/unsplashApi";
import { formDateToday, formDateTomorrow } from "../../helpers/date";
import { goalCreated } from "../../store/goalSlice";
import { useSelectedScope } from "../../store/scopeSlice";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Radio } from "../shared/radio";

interface GoalFormProps {
  onClose: () => void;
}

export function GoalForm({ onClose: onCloseProp }: GoalFormProps) {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();

  async function createGoalOnClick(goal: IGoal | ISavedGoal) {
    console.log({ selectedScope });
    const savedGoal = await createOrSaveModel<IGoal>("Goal", goal);
    dispatch(goalCreated({ goal: savedGoal }));
    onCloseProp();
  }

  function onClose() {
    onCloseProp();
  }

  return (
    <_GoalForm
      onClose={onClose}
      scopeId={selectedScope._id}
      onSave={createGoalOnClick}
    />
  );
}

interface _GoalFormProps {
  onClose: () => void;
  onSave: (goal: IGoal | ISavedGoal) => void;
  scopeId: string;
  existingGoal?: ISavedGoal;
}

export function _GoalForm({
  existingGoal,
  onClose,
  scopeId,
  onSave,
}: _GoalFormProps) {
  const [goalProperties, setGoalProperties] = useState<
    IGoal | IGoalTrackable | ISavedGoal | ISavedGoalTrackable
  >(
    existingGoal || {
      title: "",
      startDate: formDateToday(),
      dueDate: formDateTomorrow(),
      trackingMethod: undefined,
      scopeId,
      coverPhotoUrl: undefined,
    }
  );

  const [coverPhotoSearch, setCoverPhotoSearch] = useState("");
  const [coverPhotos, setCoverPhotos] = useState<string[]>([]);

  function updateGoalProperty(
    property: keyof IGoal | keyof IGoalTrackable,
    value: string | number
  ) {
    setGoalProperties((p) => ({
      ...p,
      [property]: value,
    }));
  }

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(async () => {
      if (!coverPhotoSearch.length) return;
      const response = await getPhotoListFromTerm(coverPhotoSearch);
      setCoverPhotos(response);
      console.log({ response });
    }, 500);
    return () => clearTimeout(timeout);
  }, [coverPhotoSearch]);

  return (
    <div className="absolute left-0 right-0 top-0 bottom-0 z-50 bg-[rgba(0,0,0,0.75)] flex justify-center items-center">
      <div className="flex flex-col p-[40px] bg-white rounded-[10px] shadow w-[400px] flex-shrink-0">
        <Input
          type="text"
          value={goalProperties.title}
          onChange={(value) => updateGoalProperty("title", value)}
          placeholder="Spend 40 hours learning Spanish"
          label="Title"
        />

        <Input
          type="date"
          value={goalProperties.startDate}
          onChange={(value) => updateGoalProperty("startDate", value)}
          label="Start Date"
        />

        <Input
          type="date"
          value={goalProperties.dueDate}
          onChange={(value) => updateGoalProperty("dueDate", value)}
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
                  "border-green-400 border-[5px]":
                    goalProperties.coverPhotoUrl === photoUrl,
                })}
                onClick={() => updateGoalProperty("coverPhotoUrl", photoUrl)}
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
            label="None"
            setName="goalTrackingType"
            value={undefined}
            checkedValue={goalProperties?.trackingMethod}
            onClick={(value) =>
              updateGoalProperty("trackingMethod", value as TrackingMethod)
            }
          />

          <Radio
            label="Yes/No"
            setName="goalTrackingType"
            value="yes/no"
            checkedValue={goalProperties?.trackingMethod}
            onClick={(value) =>
              updateGoalProperty("trackingMethod", value as TrackingMethod)
            }
          />

          <Radio
            label="Hours"
            setName="goalTrackingType"
            value="hours"
            checkedValue={goalProperties?.trackingMethod}
            onClick={(value) =>
              updateGoalProperty("trackingMethod", value as TrackingMethod)
            }
          />
        </div>

        {isTrackableGoal(goalProperties) && (
          <Input
            label={`Goal ${goalProperties.trackingMethod}`}
            value={goalProperties.trackingGoalQuantity}
            onChange={(value) =>
              updateGoalProperty("trackingGoalQuantity", value)
            }
            placeholder="50"
            type="number"
          />
        )}

        <footer className="flex justify-between">
          <Button onClick={() => onClose()} text="Close" type="gentle">
            <FaTimes />
          </Button>
          <Button onClick={() => onSave(goalProperties)} text="Create Goal" />
        </footer>
      </div>
    </div>
  );
}
