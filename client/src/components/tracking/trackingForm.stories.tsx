import React from "react";
import { _TrackingForm } from "./trackingForm";

export default {
  title: "Tracking",
  component: _TrackingForm,
};

export const hours = () => (
  <_TrackingForm
    trackingMethod="hours"
    onSave={(values) => console.log({ values })}
  />
);
export const yesNo = () => (
  <_TrackingForm
    trackingMethod="yes/no"
    onSave={(values) => console.log({ values })}
  />
);
export const minutes = () => (
  <_TrackingForm
    trackingMethod="minutes"
    onSave={(values) => console.log({ values })}
  />
);
