import React from "react";

interface InputProps {
  placeholder: string;
  onChange: (value: any) => void;
  value: any;
  type?: string;
}

export function Input({ placeholder, onChange, type, value }: InputProps) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      type={type || "text"}
      className="border-gray-300 border-[1px] py-[5px] px-[10px] w-full text-[12px]"
    />
  );
}
