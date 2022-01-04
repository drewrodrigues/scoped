import React, { useState } from "react";
import { TrackerType } from "../data/couchModel";

interface HabitsProps {}

export function Habits({}: HabitsProps) {
  const [title, setTitle] = useState("");
  const [tracker, setTracker] = useState<TrackerType>("checkable");

  function createHabit() {}

  return (
    <main className="p-[20px]">
      <header className="flex">
        <input
          type="text"
          placeholder="Habit name"
          className="mr-[10px] px-[7px] py-[5px] border"
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="border px-[7px]"
          onChange={(e) => setTracker(e.target.value as TrackerType)}
          value={tracker}
        >
          <option value="checkable">Checkable</option>
          <option value="duration">Duration</option>
        </select>

        <button
          className="ml-[10px] text-white bg-green-600 px-[15px] py-[7px]"
          onClick={createHabit}
        >
          Add Habit
        </button>
      </header>
    </main>
  );
}
