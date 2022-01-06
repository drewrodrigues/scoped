import classNames from "classnames";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface RadioProps {
  name: string;
  value: string;
  checkedValue: string;
  onClick: (value: string) => void;
}

export function Radio({ onClick, checkedValue, value, name }: RadioProps) {
  const isChecked = checkedValue == value;

  return (
    <div className="flex items-center">
      <input
        type="radio"
        name={name}
        value={value}
        checked={isChecked}
        onChange={() => onClick(value)}
        id={value}
        className="hidden"
      />
      <label
        htmlFor={value}
        className={classNames(
          "ml-[3px] mr-[3px] bg-gray-100 py-[5px] px-[10px] flex items-center",
          { "bg-green-300": isChecked }
        )}
      >
        {isChecked && (
          <FaCheck className="text-green-700 text-[12px] mr-[3px]" />
        )}
        {name}
      </label>
    </div>
  );
}
