import classNames from "classnames";
import React, { useEffect, useState } from "react";
import Cleave from "cleave.js/react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Goal } from "../../data/couchModel";
import { getPhotoListFromTerm } from "../../external/unsplashApi";
import { goalCreated } from "../../store/goalSlice";
import { useSelectedScope } from "../../store/scopeSlice";

interface GoalFormProps {}

export function GoalForm({}: GoalFormProps) {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();

  const [goalTitle, setGoalTitle] = useState("");
  const [goalStartDate, setGoalStartDate] = useState("");
  const [goalTrackingType, setGoalTrackingType] = useState<
    "none" | "duration" | "checkable"
  >("none");
  const [goalDueDate, setGoalDueDate] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [trackingGoalQuantity, setTrackingGoalQuantity] = useState("");

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
      trackingType: goalTrackingType,
      startDate: goalStartDate,
      dueDate: goalDueDate,
      coverPhotoUrl,
      scopeId: selectedScope!._id,
      tracking: {},
      trackingGoalQuantity,
    });
    const savedGoal = await goal.save();
    dispatch(goalCreated({ goal: savedGoal }));
    setGoalTitle("");
  }

  return (
    <>
      <header className="mb-[20px] flex items-center pr-[20px] flex-wrap">
        <div className="flex flex-col">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
            placeholder="Spend 40 hours learning Spanish"
            className="rounded-[5px] p-[10px] mr-[5px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Start Date</label>
          <input
            type="date"
            value={goalStartDate}
            onChange={(e) => setGoalStartDate(e.target.value)}
            className="rounded-[5px] p-[10px] mr-[5px] cursor-pointer"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Due Date</label>
          <input
            type="date"
            value={goalDueDate}
            onChange={(e) => setGoalDueDate(e.target.value)}
            className="rounded-[5px] p-[10px] mr-[5px] cursor-pointer"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Cover Photo</label>
          <input
            type="text"
            value={coverPhotoSearch}
            onChange={(e) => setCoverPhotoSearch(e.target.value)}
            placeholder="Unsplash Search"
            className="rounded-[5px] p-[10px] mr-[5px]"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Tracking Type</label>
          <label htmlFor="">None</label>
          <input
            type="radio"
            name="trackingType"
            value="none"
            checked={goalTrackingType == "none"}
            onChange={() => setGoalTrackingType("none")}
          />
          <label htmlFor="">Checkable</label>
          <input
            type="radio"
            name="trackingType"
            value="checkable"
            checked={goalTrackingType == "checkable"}
            onChange={() => setGoalTrackingType("checkable")}
          />
          <label htmlFor="">Duration</label>
          <input
            type="radio"
            name="trackingType"
            value="duration"
            checked={goalTrackingType == "duration"}
            onChange={() => setGoalTrackingType("duration")}
          />
        </div>

        <div>
          <label htmlFor="">Goal Quantity</label>
          <input
            type="text"
            placeholder="HH:MM"
            value={trackingGoalQuantity}
            onChange={(e) => setTrackingGoalQuantity(e.target.value)}
          />
        </div>

        <button
          onClick={createGoalOnClick}
          className="text-white px-[15px] py-[7px] bg-green-500 flex items-center rounded-[5px] hover:bg-green-600 transition-colors text-[14px] shrink-0"
        >
          <FaPlus className="mr-[5px]" />
          Add Goal
        </button>
      </header>

      {coverPhotos.length ? (
        <div className="">
          {coverPhotos.map((photoUrl) => (
            <img
              src={photoUrl}
              className={classNames("cover-photo-option", {
                "cover-photo-option--select": coverPhotoUrl === photoUrl,
              })}
              onClick={() => setCoverPhotoUrl(photoUrl)}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
