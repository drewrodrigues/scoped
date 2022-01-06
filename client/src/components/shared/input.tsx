import React from "react";

interface InputProps {
  placeholder?: string;
  onChange: (value: any) => void;
  value: any;
  label?: string;
  type?: string;
}

export function Input({
  placeholder,
  onChange,
  type,
  value,
  label,
}: InputProps) {
  return (
    <div className="mb-[10px]">
      {label && (
        <label htmlFor={placeholder} className="mb-[5px] block text-[13px]">
          {label}
        </label>
      )}
      <input
        id={placeholder}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        type={type || "text"}
        className="border-gray-300 border-[1px] py-[5px] px-[10px] w-full text-[12px]"
      />
    </div>
  );
}
