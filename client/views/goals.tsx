import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Goal, IGoal, SavedType } from "../data/couchModel";
import {
  goalCreated,
  goalDeleted,
  goalsLoaded,
  useGoalsInSelectedScope,
} from "../store/goalSlice";
import { useSelectedScope } from "../store/scopeSlice";

import "./_goals.scss";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();
  const [images, setImages] = useState<Record<string, string>>({});
  const goals = useGoalsInSelectedScope();

  const [goalTitle, setGoalTitle] = useState("");

  async function createGoalOnClick() {
    console.log({ selectedScope });
    const goal = new Goal({ title: goalTitle, Scope_id: selectedScope!._id });
    const savedGoal = await goal.save();
    dispatch(goalCreated({ goal: savedGoal }));
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
      {selectedScope?.title}

      <input
        type="text"
        value={goalTitle}
        onChange={(e) => setGoalTitle(e.target.value)}
      />
      <button onClick={createGoalOnClick}>
        <FaPlus />
        Add Goal
      </button>

      <ul className="goal-list">
        {goals.map((goal) => {
          return (
            <li key={goal._id} className="goal-list__item">
              {/* <img src={images[goal.photoId]} alt="Something goes here" /> */}
              {/* <input type="file" onChange={(e) => attachPhoto(e, goal)} /> */}
              {/* {images[goal.photoId]} */}
              {goal.title}
              <button onClick={() => onDeleteGoalClick(goal)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
