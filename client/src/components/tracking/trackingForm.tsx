import moment from "moment";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createOrSaveModel, destroy } from "../../data/modelCrud";
import {
  ISavedTracking,
  ITracking,
  TrackingMethod,
} from "../../data/modelTypes";
import { trackingAdded, trackingDeleted } from "../../store/trackingSlice";
import { Button } from "../shared/button";
import { TrackingDate } from "./trackingDate";
import { TrackingQuantity } from "./trackingQuantity";

interface TrackingSharedFormProps {
  onTrackingComplete?: () => void;
  initiatingItemRef?: React.RefObject<HTMLElement>;
}

interface TrackingNewFormProps extends TrackingSharedFormProps {
  trackingMethod: TrackingMethod;
  goalId: string;
}

interface TrackingEditFormProps extends TrackingSharedFormProps {
  existingTracking: ISavedTracking;
}

export function NewTrackingForm({
  trackingMethod,
  goalId,
  onTrackingComplete,
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
      trackingMethod={trackingMethod}
      onSave={createTrackingOnGoal}
    />
  );
}

export function EditTrackingForm({
  onTrackingComplete,
  existingTracking,
}: TrackingEditFormProps) {
  const dispatch = useDispatch();

  async function updateTracking({
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

  async function deleteTracking() {
    await destroy({ _id: existingTracking._id, _rev: existingTracking._rev });
    dispatch(trackingDeleted({ value: existingTracking }));
    onTrackingComplete?.();
  }

  return (
    <_TrackingForm
      trackingMethod={existingTracking.trackingMethod}
      onSave={updateTracking}
      onDelete={deleteTracking}
      existingTracking={existingTracking}
    />
  );
}

interface _TrackingFormProps {
  trackingMethod: TrackingMethod;
  onSave?: (trackingAttributes: { quantity: string; date: string }) => void;
  onDelete?: () => void;
  existingTracking?: ITracking;
}

export function _TrackingForm({
  onSave: onSaveProp,
  onDelete,
  existingTracking,
}: _TrackingFormProps) {
  const [date, setDate] = useState<string>(
    existingTracking?.date
      ? moment(existingTracking.date).format("YYYY-MM-DD")
      : moment(new Date()).format("YYYY-MM-DD")
  );
  const [quantity, setQuantity] = useState<number>(
    existingTracking?.value || 1
  );

  function onTrack() {
    onSaveProp?.({
      quantity: quantity.toString(),
      date,
    });
  }

  return (
    <section className="w-[350px] p-[10px] shadow bg-white">
      <TrackingDate onUpdate={(date) => setDate(date)} date={date} />
      <TrackingQuantity
        onUpdate={(quantity) => setQuantity(quantity)}
        quantity={quantity}
      />

      <footer className="flex justify-between">
        <Button text="Track" onClick={onTrack} />

        {existingTracking && (
          <Button text="" onClick={() => onDelete?.()} type="gentle">
            <FaTrash />
          </Button>
        )}
      </footer>
    </section>
  );
}
