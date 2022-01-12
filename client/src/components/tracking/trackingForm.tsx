import moment from "moment";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaSun,
  FaTrash,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createOrSaveModel } from "../../data/modelCrud";
import { ISavedTracking, ITracking } from "../../data/modelTypes";
import { todaysDate, yesterdaysDate } from "../../helpers/date";
import { trackingAdded } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { Input } from "../shared/input";
import { Radio } from "../shared/radio";

interface TrackingSharedFormProps {
  onTrackingComplete?: () => void;
  initiatingItemRef?: React.RefObject<HTMLElement>;
}

interface TrackingNewFormProps extends TrackingSharedFormProps {
  goalId: string;
}

interface TrackingEditFormProps extends TrackingSharedFormProps {
  existingTracking: ISavedTracking;
}

export function NewTrackingForm({
  goalId,
  onTrackingComplete,
  initiatingItemRef,
}: TrackingNewFormProps) {
  const dispatch = useDispatch();

  async function createTrackingOnGoal({
    quantity,
    date,
  }: {
    quantity: string;
    date: string;
  }) {
    const tracking = await createOrSaveModel<ITracking>("Tracking", {
      trackingMethod: "hours",
      value: parseInt(quantity),
      date,
      goalId,
    });

    dispatch(trackingAdded({ value: tracking }));
    onTrackingComplete?.();
  }

  return (
    <_TrackingForm
      onSave={createTrackingOnGoal}
      initiatingItemRef={initiatingItemRef}
    />
  );
}

export function EditTrackingForm({
  onTrackingComplete,
  initiatingItemRef,
  existingTracking,
}: TrackingEditFormProps) {
  const dispatch = useDispatch();

  async function createTrackingOnGoal({
    quantity,
    date,
  }: {
    quantity: string;
    date: string;
  }) {
    const tracking = await createOrSaveModel<ITracking>("Tracking", {
      ...existingTracking,
      value: parseInt(quantity),
      date,
    });

    dispatch(trackingAdded({ value: tracking }));
    onTrackingComplete?.();
  }

  return (
    <_TrackingForm
      onSave={createTrackingOnGoal}
      initiatingItemRef={initiatingItemRef}
      existingTracking={existingTracking}
    />
  );
}

interface _TrackingFormProps {
  onSave?: (trackingAttributes: { quantity: string; date: string }) => void;
  initiatingItemRef?: React.RefObject<HTMLElement>;
  existingTracking?: ITracking;
}

export function _TrackingForm({
  onSave: onSaveProp,
  initiatingItemRef,
  existingTracking,
}: _TrackingFormProps) {
  const [date, setDate] = useState<string>(
    existingTracking?.date
      ? moment(existingTracking.date).format("YYYY-MM-DD")
      : moment(new Date()).format("YYYY-MM-DD")
  );
  const [quantity, setQuantity] = useState(existingTracking?.value || 0);

  console.log({ date });

  const [easyDateSelection, setEasyDateSelection] = useState<
    "today" | "yesterday" | "other"
  >(existingTracking?.date ? "other" : "today");
  const [easyQuantitySelection, setEasyQuantitySelection] = useState<
    number | "other"
  >(existingTracking?.value ? "other" : 1);

  function easyDate(): string | null {
    if (easyDateSelection === "today") {
      return todaysDate().toUTCString();
    } else if (easyDateSelection === "yesterday") {
      return yesterdaysDate().toUTCString();
    } else {
      return null;
    }
  }

  function onTrack() {
    onSaveProp?.({
      quantity:
        easyQuantitySelection === "other"
          ? quantity.toString()
          : easyQuantitySelection.toString(),
      date: easyDate() || new Date(date).toUTCString(),
    });
    setEasyDateSelection("today");
    setEasyQuantitySelection(1);
    setDate("");
    setQuantity(0);
  }

  const containerRef = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    // TODO: clean me up -- I'm ugly af
    if (initiatingItemRef?.current) {
      const rect = initiatingItemRef.current.getBoundingClientRect();
      const { left, top } = rect;

      // @ts-ignore
      containerRef.current?.style.position = "fixed";
      // @ts-ignore
      containerRef.current?.style.zIndex = "100";
      // @ts-ignore
      containerRef.current?.style.left = `${left}px`;
      // @ts-ignore
      containerRef.current?.style.top = `${top + 40}px`;
    }
  }, []);

  return (
    <section className="w-[350px] p-[10px] shadow bg-white" ref={containerRef}>
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
        <Button text="" onClick={() => null} type="gentle">
          <FaTrash />
        </Button>
      </footer>
    </section>
  );
}
