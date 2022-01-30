import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { ISavedTask, ISavedTracking } from "../data/modelTypes";
import { useSelectedScope } from "./scopeSlice";
import { RootState } from "./store";
import {
  sliceAdded,
  sliceDeleted,
  sliceLoaded,
  sliceUpdated,
} from "./_sliceHelper";

export interface TaskState {
  taskRecords: Record<string, ISavedTask>;
}

const initialState: TaskState = {
  taskRecords: {},
};

export const trackingSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    tasksLoaded: sliceLoaded<TaskState, ISavedTask>("taskRecords"),
    taskAdded: sliceAdded<TaskState, ISavedTask>("taskRecords"),
    taskDeleted: sliceDeleted<TaskState, ISavedTask>("taskRecords"),
    taskUpdated: sliceUpdated<TaskState, ISavedTask>("taskRecords"),
  },
});

export function useTasksInSelectedScope(): ISavedTask[] {
  const selectedScope = useSelectedScope();
  const allTasks = useSelector((state: RootState) => state.task.taskRecords);
  const filteredTasks = [];
  if (!selectedScope) return Object.values(allTasks);

  for (const [_, taskRecord] of Object.entries(allTasks)) {
    if (taskRecord.scopeId === selectedScope?._id) {
      filteredTasks.push(taskRecord);
    }
  }

  return filteredTasks;
}

export const { tasksLoaded, taskAdded, taskDeleted, taskUpdated } =
  trackingSlice.actions;

export default trackingSlice.reducer;
