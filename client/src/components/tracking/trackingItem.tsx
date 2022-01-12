import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { ISavedTracking } from "../../data/modelTypes";
import {
  EditTrackingForm,
  NewTrackingForm,
  _TrackingForm,
} from "./trackingForm";

interface TrackingItemProps {
  tracking: ISavedTracking;
  maxValueInList: number;
}

export function TrackingItem({ tracking, maxValueInList }: TrackingItemProps) {
  const [toggleEditForm, setToggleEditForm] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function closeEditForm() {
    setToggleEditForm(false);
  }

  useEffect(() => {
    document.addEventListener("scroll", closeEditForm);
    window.addEventListener("resize", closeEditForm);

    return () => {
      document.removeEventListener("scroll", closeEditForm);
      window.removeEventListener("resize", closeEditForm);
    };
  }, []);

  return (
    <>
      <button
        className="flex flex-col mb-[5px] mr-[3px] items-center relative"
        onClick={() => setToggleEditForm((p) => !p)}
        ref={buttonRef}
      >
        <div className="bg-white relative rounded-[3px] h-[20px] w-[20px] bg-green flex justify-center items-center overflow-hidden">
          <div
            className="w-full h-full bg-green-400 flex items-center justify-center absolute"
            style={{ opacity: `${(tracking.value / maxValueInList) * 100}%` }}
          ></div>
          <p className="text-[8px] relative z-10 text-green-700">
            {tracking.value}
          </p>
        </div>
        <p className="text-[6px] mt-[3px] text-center">
          {moment(tracking.date).format("M/D")}
        </p>
      </button>

      {toggleEditForm && (
        <EditTrackingForm
          initiatingItemRef={buttonRef}
          existingTracking={tracking}
          onTrackingComplete={() => setToggleEditForm(false)}
        />
      )}
    </>
  );
}
