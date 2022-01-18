import moment from "moment";
import React from "react";
import { FaArrowLeft, FaCalendar, FaSun } from "react-icons/fa";
import {
  formDateToday,
  formDateTomorrow,
  formDateYesterday,
  todaysDate,
  yesterdaysDate,
} from "../../helpers/date";
import { Input } from "../shared/input";
import { Radio } from "../shared/radio";

interface TrackingDateProps {
  date: string;
  onUpdate: (date: string) => void;
}

export function TrackingDate({ date, onUpdate }: TrackingDateProps) {
  const showOtherDateSelection = shouldShowEasyDate(date);

  return (
    <>
      <label className="mb-[5px] text-[12px]">Date</label>
      <section className="flex">
        <Radio
          label="Yesterday"
          setName="dateSelection"
          value={formDateYesterday()}
          checkedValue={showOtherDateSelection || date}
          onClick={() => onUpdate(formDateYesterday())}
        >
          <FaArrowLeft />
        </Radio>
        <Radio
          label="Today"
          setName="dateSelection"
          value={formDateToday()}
          checkedValue={showOtherDateSelection || date}
          onClick={() => onUpdate(formDateToday())}
        >
          <FaSun />
        </Radio>
        <Radio
          label="Other"
          setName="dateSelection"
          value="other"
          checkedValue={showOtherDateSelection || date}
          onClick={() => onUpdate(formDateTomorrow())}
        >
          <FaCalendar />
        </Radio>
      </section>

      <section className="mt-[10px]">
        {showOtherDateSelection === "other" && (
          <Input
            type="date"
            onChange={(value) => onUpdate(value)}
            value={date}
          />
        )}
      </section>
    </>
  );
}

function shouldShowEasyDate(date: string): false | "other" {
  if (date) {
    if (moment(date).isSame(todaysDate(), "day")) {
      return false;
    } else if (moment(date).isSame(yesterdaysDate(), "day")) {
      return false;
    }
  }

  return "other";
}
