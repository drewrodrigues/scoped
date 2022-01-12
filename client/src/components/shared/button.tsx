import classNames from "classnames";
import React from "react";
import { FaPlus } from "react-icons/fa";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  children?: JSX.Element;
  type?: "delete" | "gentle";
}

export function Button({
  onClick,
  text,
  className,
  children,
  type,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "text-white px-[10px] py-[7px] rounded-[5px] text-[12px] flex items-center ",
        className,
        {
          "bg-gray-300": type == "gentle",
          "bg-red-700": type === "delete",
          "bg-green-600": type !== "delete" && type !== "gentle",
        }
      )}
    >
      {children || <FaPlus className="mr-[4px] text-[12px]" />}
      {text}
    </button>
  );
}
