import classNames from "classnames";
import React from "react";

interface ColorPickerProps {
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
}

const COLORS = [
  ["#8154f5", "#4199f7", "#56bd7d", "#ee7e69"],
  ["#62cdce", "#3f4ef1", "#5382ce", "#d7648f"],
  ["#f1c349", "#d45d4f", "#77777d", "#99c8e4"],
];

export function ColorPicker({
  selectedColor,
  onColorSelect,
}: ColorPickerProps) {
  return (
    <div className="inline-flex shadow-lg flex-col p-[15px] rounded-[5px]">
      {COLORS.map((row) => (
        <section className="flex">
          {row.map((color) => (
            <div
              className={classNames(
                "p-[10px] rounded-[10px] cursor-pointer hover:bg-gray-200 hover:border-gray-200 border",
                {
                  "border-gray-300": selectedColor === color,
                  "border-white": selectedColor !== color,
                }
              )}
              onClick={() => onColorSelect?.(color)}
            >
              <button
                className="w-[15px] h-[15px] block rounded-[3px]"
                style={{ background: color }}
              />
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
