import { SavedType } from "./modelCrud";

export interface IScope {
  title: string;
}

export interface IGoalTrackable extends IGoal {
  trackingMethod: TrackingMethod;
  trackingGoalQuantity: number;
}

export interface IGoal {
  title: string;
  scopeId: string;
  coverPhotoUrl?: string;

  // make these a pair
  startDate?: string;
  dueDate?: string;

  photoContainerId?: string;
  photoId?: string;
}

export type TrackingMethod = "yes/no" | "minutes" | "hours";

export interface ITracking {
  trackingMethod: TrackingMethod;
  value: number;
  date: Date;
  goalId: string;
}

export type ISavedGoal = SavedType<IGoal>;
export type ISavedGoalTrackable = SavedType<IGoalTrackable>;
export type ISavedScope = SavedType<IScope>;
export type ISavedTracking = SavedType<ITracking>;

export type ModelStringType = "Tracking" | "Scope" | "Goal";
export type ModelType = IScope | ITracking | IGoalTrackable | IGoal;
