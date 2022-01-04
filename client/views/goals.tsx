import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Goal, IGoal, SavedType } from "../data/couchModel";
import {
  goalCreated,
  goalDeleted,
  useGoalsInSelectedScope,
} from "../store/goalSlice";
import moment from "moment";
import { useSelectedScope } from "../store/scopeSlice";

import { getPhotoListFromTerm } from "../external/unsplashApi";
import classNames from "classnames";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();
  const [images, setImages] = useState<Record<string, string>>({});
  const goals = useGoalsInSelectedScope();

  const [goalTitle, setGoalTitle] = useState("");
  const [goalDueDate, setGoalDueDate] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");

  const [coverPhotoSearch, setCoverPhotoSearch] = useState("");
  const [coverPhotos, setCoverPhotos] = useState<string[]>([]);

  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(async () => {
      if (!coverPhotoSearch.length) return;
      const response = await getPhotoListFromTerm(coverPhotoSearch);
      setCoverPhotos(response);
      console.log({ response });
    }, 1000);
    return () => clearTimeout(timeout);
  }, [coverPhotoSearch]);

  async function createGoalOnClick() {
    console.log({ selectedScope });
    const goal = new Goal({
      title: goalTitle,
      dueDate: goalDueDate,
      coverPhotoUrl,
      scopeId: selectedScope!._id,
    });
    const savedGoal = await goal.save();
    dispatch(goalCreated({ goal: savedGoal }));
    setGoalTitle("");
  }

  async function onDeleteGoalClick(goal: SavedType<IGoal>) {
    const savedGoal = new Goal(goal);
    await savedGoal.destroy();
    dispatch(goalDeleted({ goal }));
  }

  return (
    <main className="pt-[20px] pl-[20px]">
      <header className="mb-[20px] flex">
        <input
          type="text"
          value={goalTitle}
          onChange={(e) => setGoalTitle(e.target.value)}
          placeholder="Title"
          className="rounded-[5px] p-[10px] mr-[5px]"
        />
        <input
          type="date"
          value={goalDueDate}
          onChange={(e) => setGoalDueDate(e.target.value)}
          className="rounded-[5px] p-[10px] mr-[5px] cursor-pointer"
        />
        <input
          type="text"
          value={coverPhotoSearch}
          onChange={(e) => setCoverPhotoSearch(e.target.value)}
          placeholder="Unsplash Search"
          className="rounded-[5px] p-[10px] mr-[5px]"
        />
        <button
          onClick={createGoalOnClick}
          className="text-white px-[15px] py-[7px] bg-green-500 flex items-center rounded-[5px] hover:bg-green-600 transition-colors text-[14px]"
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

      <h2 className="mb-[20px]">Goals</h2>
      <ul className="flex">
        {goals.map((goal, i) => {
          return (
            <div
              key={goal._id}
              className="flex flex-col w-[400px] shrink-0 h-[250px] relative mr-[20px] hover:opacity-100 transition-opacity cursor-pointer"
              style={{ opacity: `${100 - 35 * i}%` }}
            >
              <img
                src={goal.coverPhotoUrl}
                alt="Something goes here"
                className="w-full rounded-[10px] object-cover h-full"
              />

              <button
                onClick={() => onDeleteGoalClick(goal)}
                className="absolute top-[10px] right-[10px] bg-white py-[7px] px-[10px] rounded-[5px] text-[12px] opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              >
                Delete
              </button>

              <div>
                <p className="text-[14px] mt-[20px]">{goal.title}</p>

                {goal.dueDate && (
                  <footer className="text-[12px]">
                    {"due " + moment(goal.dueDate).fromNow()}
                  </footer>
                )}
              </div>
            </div>
          );
        })}
      </ul>
    </main>
  );
}
