import classNames from "classnames";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface RadioProps {
  label: string;
  setName: string;
  value: string;
  checkedValue: any;
  onClick: (value: string) => void;
  children?: JSX.Element;
}

export function Radio({
  onClick,
  checkedValue,
  value,
  setName,
  label,
  children,
}: RadioProps) {
  const isChecked = checkedValue == value;
  const icon = children ? children : isChecked && <FaCheck />;

  return (
    <div className="flex items-center w-full">
      <input
        type="radio"
        name={setName}
        value={value}
        checked={isChecked}
        onChange={() => onClick(value)}
        id={`${setName}-${value}`}
        className="hidden"
      />
      <label
        htmlFor={`${setName}-${value}`}
        className={classNames(
          "mr-[3px] bg-gray-100 py-[5px] px-[10px] flex items-center text-[12px] w-full cursor-pointer",
          { "bg-green-300": isChecked }
        )}
      >
        <div className="text-green-700 text-[10px] mr-[3px]">{icon}</div>
        {label}
      </label>
    </div>
  );
}
