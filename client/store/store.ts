import { configureStore } from "@reduxjs/toolkit";
import ScopeSliceReducer from "./scopeSlice";
// import GoalSliceReducer from "./goalSlice";

export const store = configureStore({
  reducer: {
    scope: ScopeSliceReducer,
    // goal: GoalSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
