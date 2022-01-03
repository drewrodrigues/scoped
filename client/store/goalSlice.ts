// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IGoal } from "../data/goal";

// export interface GoalState {
//   goalRecords: IGoal[];
// }

// const initialState: GoalState = {
//   goalRecords: [],
// };

// export const scopeSlice = createSlice({
//   name: "scope",
//   initialState,
//   reducers: {
//     goalsLoaded: (
//       state,
//       { payload: { goals } }: PayloadAction<{ goals: IGoal[] }>
//     ) => {
//       state.goalRecords = goals;
//     },
//     goalCreated: (
//       state,
//       { payload: { goal } }: PayloadAction<{ goal: IGoal }>
//     ) => {
//       state.goalRecords.push(goal);
//     },
//     goalUpdated: (
//       state,
//       { payload: { goal } }: PayloadAction<{ goal: IGoal }>
//     ) => {
//       const replacableGoalIndex = state.goalRecords.findIndex(
//         (storedGoal) => storedGoal._id === goal._id
//       );
//       state.goalRecords[replacableGoalIndex] = goal;
//     },
//   },
// });

// export const { goalsLoaded, goalCreated, goalUpdated } = scopeSlice.actions;

// export default scopeSlice.reducer;
