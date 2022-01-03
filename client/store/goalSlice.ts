import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IGoal, SavedType } from "../data/couchModel";
import { useSelectedScope } from "./scopeSlice";
import { RootState } from "./store";

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
  },
});

export function useGoalsInSelectedScope() {
  const selectedScope = useSelectedScope();
  const allGoals = useSelector((state: RootState) => state.goal.goalRecords);
  const filteredGoals = [];

  for (const [id, goalRecord] of Object.entries(allGoals)) {
    if (goalRecord.Scope_id === selectedScope?._id) {
      filteredGoals.push(goalRecord);
    }
  }

  return filteredGoals;
}

export const { goalsLoaded, goalCreated, goalUpdated } = scopeSlice.actions;

export default scopeSlice.reducer;
