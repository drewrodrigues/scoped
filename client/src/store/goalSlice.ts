import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { SavedType } from "../data/modelCrud";
import { ISavedGoal } from "../data/modelTypes";
import { useSelectedScope } from "./scopeSlice";
import { RootState } from "./store";

export interface GoalState {
  goalRecords: Record<string, ISavedGoal>;
}

const initialState: GoalState = {
  goalRecords: {},
};

export const scopeSlice = createSlice({
  name: "scope",
  initialState,
  reducers: {
    goalsLoaded: (
      state,
      { payload: { goals } }: PayloadAction<{ goals: SavedType<ISavedGoal>[] }>
    ) => {
      goals.forEach((goal) => {
        state.goalRecords[goal._id] = goal;
      });
    },
    goalCreated: (
      state,
      { payload: { goal } }: PayloadAction<{ goal: SavedType<ISavedGoal> }>
    ) => {
      state.goalRecords[goal._id] = goal;
    },
    goalUpdated: (
      state,
      { payload: { goal } }: PayloadAction<{ goal: SavedType<ISavedGoal> }>
    ) => {
      state.goalRecords[goal._id] = goal;
    },
    goalDeleted: (
      state,
      { payload: { goalId } }: PayloadAction<{ goalId: string }>
    ) => {
      delete state.goalRecords[goalId];
    },
  },
});

function dueDateSort(a: ISavedGoal, b: ISavedGoal) {
  if (a.dueDate && !b.dueDate) {
    return -1;
  } else if (b.dueDate && !a.dueDate) {
    return 1;
  } else if (a.dueDate && b.dueDate) {
    // @ts-ignore
    return new Date(a.dueDate) - new Date(b.dueDate);
  } else {
    return a.title.localeCompare(b.title);
  }
}

export function useGoalsInSelectedScope(): (ISavedGoal)[] {
  const selectedScope = useSelectedScope();
  const allGoals = useSelector((state: RootState) => state.goal.goalRecords);
  const filteredGoals = [];
  if (!selectedScope) return Object.values(allGoals).sort(dueDateSort);

  for (const [_, goalRecord] of Object.entries(allGoals)) {
    if (goalRecord.scopeId === selectedScope?._id) {
      filteredGoals.push(goalRecord);
    }
  }

  return filteredGoals.sort(dueDateSort);
}

export const { goalsLoaded, goalCreated, goalUpdated, goalDeleted } =
  scopeSlice.actions;

export default scopeSlice.reducer;
