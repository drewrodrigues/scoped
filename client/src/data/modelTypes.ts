import { SavedType } from "./modelCrud";

export interface IScope {
  title: string;
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
}

export type TrackingMethod = "yes/no" | "minutes" | "hours" | "quantity";

export interface ITracking {
  trackingMethod: TrackingMethod;
  value: number;
  date: string;
  goalId: string;
}

export type ISavedGoal = SavedType<IGoal>;
export type ISavedScope = SavedType<IScope>;
export type ISavedTracking = SavedType<ITracking>;

export type ModelStringType = "Tracking" | "Scope" | "Goal";
export type ModelType = IScope | ITracking | IGoal;
