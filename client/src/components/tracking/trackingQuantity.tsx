import React from "react";
import { FaClock } from "react-icons/fa";
import { Input } from "../shared/input";
import { Radio } from "../shared/radio";

interface TrackingQuantityProps<T> {
  onUpdate: (quantity: number) => void;
  quantity: number;
}

export function TrackingQuantity<T>({
  onUpdate,
  quantity,
}: TrackingQuantityProps<T>) {
  const showOtherQuantity = shouldShowOtherQuantity(quantity);

  return (
    <>
      <label className="mb-[5px] text-[12px]">Quantity</label>
      <section className="flex">
        <Radio
          label="1 hour"
          setName="quantitySelection"
          value="1"
          checkedValue={showOtherQuantity || quantity}
          onClick={() => onUpdate(1)}
        >
          <FaClock />
        </Radio>
        <Radio
          label="2 hours"
          setName="quantitySelection"
          value="2"
          checkedValue={showOtherQuantity || quantity}
          onClick={() => onUpdate(2)}
        >
          <FaClock />
        </Radio>
        <Radio
          label="Other"
          setName="quantitySelection"
          value="other"
          checkedValue={showOtherQuantity || quantity}
          onClick={() => onUpdate(3)}
        >
          <FaClock />
        </Radio>
      </section>

      <section className="mt-[10px]">
        {showOtherQuantity && (
          <Input
            type="number"
            onChange={(value) => onUpdate(value)}
            value={quantity}
          />
        )}
      </section>
    </>
  );
}

function shouldShowOtherQuantity(quantity: number): false | "other" {
  return quantity === 1 || quantity === 2 ? false : "other";
}
