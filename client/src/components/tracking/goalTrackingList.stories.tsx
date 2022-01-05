import React from "react";

import { _GoalTrackingList } from "./goalTrackingList";

export default {
  title: "Goal/TrackingList",
  component: _GoalTrackingList,
};

export const Presentational = () => (
  <_GoalTrackingList
    trackingRecords={[
      {
        _id: "",
        _rev: "",
        value: Math.floor(Math.random() * 10),
        createdOn: new Date().toUTCString(),
        goalId: "someGoalId",
        trackingMethod: "hours",
        type: "Tracking",
      },
      {
        _id: "",
        _rev: "",
        value: Math.floor(Math.random() * 10),
        createdOn: new Date().toUTCString(),
        goalId: "someGoalId",
        trackingMethod: "hours",
        type: "Tracking",
      },
      {
        _id: "",
        _rev: "",
        value: Math.floor(Math.random() * 10),
        createdOn: new Date().toUTCString(),
        goalId: "someGoalId",
        trackingMethod: "hours",
        type: "Tracking",
      },
      {
        _id: "",
        _rev: "",
        value: Math.floor(Math.random() * 10),
        createdOn: new Date().toUTCString(),
        goalId: "someGoalId",
        trackingMethod: "hours",
        type: "Tracking",
      },
      {
        _id: "",
        _rev: "",
        value: Math.floor(Math.random() * 10),
        createdOn: new Date().toUTCString(),
        goalId: "someGoalId",
        trackingMethod: "hours",
        type: "Tracking",
      },
      {
        _id: "",
        _rev: "",
        value: Math.floor(Math.random() * 10),
        createdOn: new Date().toUTCString(),
        goalId: "someGoalId",
        trackingMethod: "hours",
        type: "Tracking",
      },
      {
        _id: "",
        _rev: "",
        value: Math.floor(Math.random() * 10),
        createdOn: new Date().toUTCString(),
        goalId: "someGoalId",
        trackingMethod: "hours",
        type: "Tracking",
      },
    ]}
  />
);
