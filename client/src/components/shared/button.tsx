import classNames from "classnames";
import React from "react";
import { FaPlus } from "react-icons/fa";

interface ButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
  children?: JSX.Element;
}

export function Button({ onClick, text, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{ boxShadow: "0 1px 1px #dedede" }}
      className={classNames(
        "px-[13px] py-[7px] rounded-[3px] text-[12px] flex items-center border bg-white",
        className
      )}
    >
      {children ? (
        <span className={classNames("text-[12px]", { "mr-[4px]": text })}>
          {children}
        </span>
      ) : (
        <FaPlus className={classNames("text-[12px]", { "mr-[4px]": text })} />
      )}
      {text}
    </button>
  );
}
