import React, { useState } from "react";
import {
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaHashtag,
  FaSun,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Tracking } from "../../data/couchModel";
import { todaysDate, yesterdaysDate } from "../../helpers/date";
import { trackingAdded } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Radio } from "../shared/radio";

interface TrackingFormProps {
  goalId: string;
}

export function TrackingForm({ goalId }: TrackingFormProps) {
  const dispatch = useDispatch();

  async function createTrackingOnGoal({
    quantity,
    date,
  }: {
    quantity: string;
    date: Date;
  }) {
    const tracking = new Tracking({
      trackingMethod: "hours",
      value: parseInt(quantity),
      date,
      goalId,
    });
    const newTracking = await tracking.save();

    dispatch(trackingAdded({ value: newTracking }));
    console.log({ newTracking });
  }

  return <_TrackingForm onTrack={createTrackingOnGoal} />;
}

interface _TrackingFormProps {
  onTrack?: (trackingAttributes: { quantity: string; date: Date }) => void;
}

export function _TrackingForm({ onTrack: onTrackProp }: _TrackingFormProps) {
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(0);

  const [easyDateSelection, setEasyDateSelection] = useState<
    "today" | "yesterday" | "other"
  >("today");
  const [easyQuantitySelection, setEasyQuantitySelection] = useState<
    number | "other"
  >(1);

  function easyDate(): Date | null {
    if (easyDateSelection === "today") {
      return todaysDate();
    } else if (easyDateSelection === "yesterday") {
      return yesterdaysDate();
    } else {
      return null;
    }
  }

  function onTrack() {
    onTrackProp?.({
      quantity:
        easyQuantitySelection === "other"
          ? quantity.toString()
          : easyQuantitySelection.toString(),
      date: easyDate() || new Date(date),
    });
    setEasyDateSelection("today");
    setEasyQuantitySelection(1);
    setDate("");
    setQuantity(0);
  }

  return (
    <section className="w-[350px] p-[10px] shadow-md bg-white">
      <header className="">
        <label className="mb-[5px] text-[12px]">Date</label>
        <section className="flex">
          <Radio
            label="Yesterday"
            setName="easyDateSelection"
            value="yesterday"
            checkedValue={easyDateSelection}
            onClick={() => setEasyDateSelection("yesterday")}
          >
            <FaArrowLeft />
          </Radio>
          <Radio
            label="Today"
            setName="easyDateSelection"
            value="today"
            checkedValue={easyDateSelection}
            onClick={() => setEasyDateSelection("today")}
          >
            <FaSun />
          </Radio>
          <Radio
            label="Other"
            setName="easyDateSelection"
            value="other"
            checkedValue={easyDateSelection}
            onClick={() => setEasyDateSelection("other")}
          >
            <FaCalendar />
          </Radio>
        </section>

        <section className="mt-[10px]">
          {easyDateSelection === "other" && (
            <Input
              type="date"
              onChange={(value) => setDate(value)}
              value={date}
            />
          )}
        </section>

        <label className="mb-[5px] text-[12px]">Quantity</label>
        <section className="flex">
          <Radio
            label="1 hour"
            setName="easyQuantitySelection"
            value="1"
            checkedValue={easyQuantitySelection}
            onClick={() => setEasyQuantitySelection(1)}
          >
            <FaClock />
          </Radio>
          <Radio
            label="2 hours"
            setName="easyQuantitySelection"
            value="2"
            checkedValue={easyQuantitySelection}
            onClick={() => setEasyQuantitySelection(2)}
          >
            <FaClock />
          </Radio>
          <Radio
            label="Other"
            setName="easyQuantitySelection"
            value="other"
            checkedValue={easyQuantitySelection}
            onClick={() => setEasyQuantitySelection("other")}
          >
            <FaClock />
          </Radio>
        </section>

        <section className="mt-[10px]">
          {easyQuantitySelection === "other" && (
            <Input
              type="number"
              onChange={(value) => setQuantity(value)}
              value={quantity}
            />
          )}
        </section>
      </header>

      <footer className="flex justify-between">
        <Button text="Track" onClick={onTrack} />
      </footer>
    </section>
  );
}
