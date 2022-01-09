import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IGoal, SavedType } from "../data/modelCrud";
import { useSelectedScope } from "./scopeSlice";
import { RootState } from "./store";
import { sliceLoaded } from "./_sliceHelper";

export interface GoalState {
  goalRecords: Record<string, SavedType<IGoal>>;
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
      { payload: { goals } }: PayloadAction<{ goals: SavedType<IGoal>[] }>
    ) => {
      goals.forEach((goal) => {
        state.goalRecords[goal._id] = goal;
      });
    },
    goalCreated: (
      state,
      { payload: { goal } }: PayloadAction<{ goal: SavedType<IGoal> }>
    ) => {
      state.goalRecords[goal._id] = goal;
    },
    goalUpdated: (
      state,
      { payload: { goal } }: PayloadAction<{ goal: SavedType<IGoal> }>
    ) => {
      state.goalRecords[goal._id] = goal;
    },
    goalDeleted: (
      state,
      { payload: { goal } }: PayloadAction<{ goal: SavedType<IGoal> }>
    ) => {
      delete state.goalRecords[goal._id];
    },
  },
});

export function useGoalsInSelectedScope() {
  const selectedScope = useSelectedScope();
  const allGoals = useSelector((state: RootState) => state.goal.goalRecords);
  const filteredGoals = [];

  for (const [_, goalRecord] of Object.entries(allGoals)) {
    if (goalRecord.scopeId === selectedScope?._id) {
      filteredGoals.push(goalRecord);
    }
  }

  return filteredGoals;
}

export const { goalsLoaded, goalCreated, goalUpdated, goalDeleted } =
  scopeSlice.actions;

export default scopeSlice.reducer;
