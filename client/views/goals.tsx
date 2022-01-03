import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import db from "../data/db";
import relDb from "../data/db";
import {
  createGoal,
  getGoals,
  Goal,
  useGoalsInSelectedScope,
} from "../data/goal";
// import { goalCreated } from "../store/goalSlice";
import { useSelectedScope } from "../store/scopeSlice";
import { RootState } from "../store/store";

import "./_goals.scss";

interface GoalsProps {}

export function Goals({}: GoalsProps) {
  const dispatch = useDispatch();
  const selectedScope = useSelectedScope();
  const [images, setImages] = useState<Record<string, string>>({});
  const goals = useGoalsInSelectedScope();

  const [goalTitle, setGoalTitle] = useState("");

  async function createGoalOnClick() {
    // const goal = await createGoal(selectedScope, goalTitle);
    // dispatch(goalCreated({ goal }));
  }

  async function attachPhoto(
    event: React.ChangeEvent<HTMLInputElement>,
    goal: Goal
  ) {
    // try {
    //   const photo = event.target.files[0];
    //   if (photo) {
    //     console.log(photo);
    //     const photoId = Date.now().toString();
    //     const photoAttachment = await relDb.rel.putAttachment(
    //       "goal",
    //       { id: photoId },
    //       "photo",
    //       photo,
    //       photo.type
    //     );
    //     console.log({ photoAttachment });
    //     const updatedGoal: Goal = {
    //       ...goal,
    //       photoId,
    //     };
    //     console.log("attempting goal save: ", updatedGoal);
    //     const updatedGoalResponse = await db.rel.save("goal", updatedGoal);
    //     dispatch(goalUpdated({ goal: { ...goal, ...updatedGoalResponse } }));
    //     console.log({ updatedGoalResponse });
    //   } else {
    //     console.warn("no file found");
    //   }
    // } catch (e) {
    //   console.error("attachPhoto failed: ", e);
    // }
  }

  async function getGoalAttachment(goal: Goal) {
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

  useEffect(() => {
    // getGoals(selectedScope).then((goals) => {
    //   dispatch(goalsLoaded({ goals }));
    // });
  }, [selectedScope]);

  // useEffect(() => {
  //   goals?.forEach((goal) => {
  //     getGoalAttachment(goal);
  //   });
  // }, [goals]);

  // if (!goals) return <p>Loading</p>;

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

      {/* {goals.map((goal) => {
        return (
          <>
            <img src={images[goal.photoId]} alt="Something goes here" />
            <li>
              <input type="file" onChange={(e) => attachPhoto(e, goal)} />
              {images[goal.photoId]}
              {goal.title}
            </li>
          </>
        );
      })} */}
    </main>
  );
}
