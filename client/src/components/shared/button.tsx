import React from "react";
import { FaPlus } from "react-icons/fa";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
}

export function Button({ onClick, text, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        "bg-green-600 text-white px-[10px] py-[7px] rounded-[5px] text-[12px] flex items-center " +
        className
      }
      style={{
        boxShadow: "0px 6px 9px -2px rgba(0, 0, 0, 50%)",
      }}
    >
      <FaPlus className="mr-[4px] text-[12px]" />
      {text}
    </button>
  );
}
