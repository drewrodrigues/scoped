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

import "./_goals.scss";
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

  async function getGoalAttachment(goal: IGoal) {
    // if (!goal.photoId) return;
    // try {
    //   const attachment = (await db.rel.getAttachment(
    //     "goal",
    //     goal.photoId,
    //     "photo"
    //   )) as Blob;
    //   console.log("✅ Found attachment: ", attachment);
    //   setImages((images) => ({
    //     ...images,
    //     [goal.photoId]: URL.createObjectURL(attachment),
    //   }));
    // } catch (e) {
    //   if (e.status === 404) {
    //     console.error(
    //       `Image not found on goal: ${goal._id} w/ attachmentId=${goal.photoId}`
    //     );
    //   } else {
    //     console.error(e);
    //   }
    // }
  }

  async function onDeleteGoalClick(goal: SavedType<IGoal>) {
    const savedGoal = new Goal(goal);
    await savedGoal.destroy();
    dispatch(goalDeleted({ goal }));
  }

  return (
    <main className="goals">
      <input
        type="text"
        value={goalTitle}
        onChange={(e) => setGoalTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="date"
        value={goalDueDate}
        onChange={(e) => setGoalDueDate(e.target.value)}
      />
      <input
        type="text"
        value={coverPhotoSearch}
        onChange={(e) => setCoverPhotoSearch(e.target.value)}
        placeholder="Unsplash Search"
      />
      <button onClick={createGoalOnClick}>
        <FaPlus />
        Add Goal
      </button>

      {coverPhotos.length ? (
        <div className="cover-photo-options">
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

      <h2 className="goal-title">Goals</h2>
      <ul className="goal-list">
        {goals.map((goal, i) => {
          return (
            <li
              key={goal._id}
              className="goal-list__item"
              style={{
                backgroundImage: `url(${goal.coverPhotoUrl})`,
                opacity: `${100 - i * 30}%`,
              }}
            >
              {/* <img src={images[goal.photoId]} alt="Something goes here" /> */}
              {/* <input type="file" onChange={(e) => attachPhoto(e, goal)} /> */}
              {/* {images[goal.photoId]} */}
              <div className="goal-list__item-body">
                <p>{goal.title}</p>
                <button
                  onClick={() => onDeleteGoalClick(goal)}
                  className="goal-delete-button"
                >
                  Delete
                </button>
                {goal.dueDate && (
                  <footer className="">
                    {"due " + moment(goal.dueDate).fromNow()}
                  </footer>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
