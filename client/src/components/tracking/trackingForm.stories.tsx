import React from "react";
import { _TrackingForm } from "./trackingForm";

export default {
  title: "Tracking",
  component: _TrackingForm,
};

export const hours = () => (
  <_TrackingForm
    trackingMethod="quantity"
    onSave={(values) => console.log({ values })}
  />
);
