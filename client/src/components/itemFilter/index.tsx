import classNames from "classnames";
import React from "react";
import { IconType } from "react-icons";

interface ItemFilterProps<T> {
  selectedValue: T;
  values: { count?: number; Icon: IconType; label: T }[];
  onChange: (newSelection: T) => void;
}

export function ItemFilter<T>({
  selectedValue,
  onChange,
  values,
}: ItemFilterProps<T>) {
  return (
    <div className="flex items-center">
      {values.map(({ count, Icon, label }) => (
        <button
          className={classNames(
            "mr-[5px] px-[10px] py-[10px] text-[12px] flex items-center rounded-[3px]",
            {
              "bg-gray-300": selectedValue === label,
            }
          )}
          onClick={() => onChange(label)}
        >
          <Icon className="mr-[3px]" />
          {label}

          <span
            className={classNames("ml-[5px] rounded-[3px] p-[3px]", {
              "bg-gray-400": selectedValue == label,
              "bg-gray-300": selectedValue !== label,
            })}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
}
