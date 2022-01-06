import React from "react";
import { FaPlus } from "react-icons/fa";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export function Button({ onClick, text }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 text-white px-[10px] py-[7px] rounded-[5px] text-[12px] flex items-center"
    >
      <FaPlus className="mr-[4px] text-[12px]" />
      {text}
    </button>
  );
}
