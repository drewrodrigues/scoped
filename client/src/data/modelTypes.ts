import { SavedType } from "./modelCrud";

export interface IScope {
  title: string;
  color?: string;
}

export interface IGoal {
  title: string;
  scopeId: string;
  coverPhotoUrl?: string;

  // tracking
  trackingMethod?: TrackingMethod;
  trackingGoalQuantity?: number;

  // make these a pair
  startDate?: string;
  dueDate?: string;

  photoContainerId?: string;
  photoId?: string;

  // for today view
  lastDismissed?: string;

  // motivation
  completionReward?: string;

  // finished states
  finishingState?: {
    date: string;
    status: "failed" | "completed";
    note?: string;
  };
}

export type TrackingMethod = "quantity";

export interface ITracking {
  trackingMethod: TrackingMethod;
  value: number;
  date: string;
  goalId: string;
}

export interface ITask {
  title: string;
  scopeId: string;
  completedOn?: string;

  // for today view
  lastDismissed?: string;
  dueDate?: string;
}

export type ISavedGoal = SavedType<IGoal>;
export type ISavedScope = SavedType<IScope>;
export type ISavedTracking = SavedType<ITracking>;
export type ISavedTask = SavedType<ITask>;

export type ModelStringType = "Tracking" | "Scope" | "Goal" | "Task";
export type ModelType = IScope | ITracking | IGoal | ITask;
