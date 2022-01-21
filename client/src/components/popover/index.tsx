import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hidePopover } from "../../store/popoverSlice";
import { RootState } from "../../store/store";

interface PopoverProps {}

export function PopoverLayer({}: PopoverProps) {
  const { element } = useSelector((state: RootState) => state.popover);
  const dispatch = useDispatch();

  if (!element) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50"
      style={{ background: "rgba(0,0,0,0.3)" }}
      onClick={() => dispatch(hidePopover())}
    >
      <div
        style={{ left: element.x, top: element.y }}
        className="bg-white absolute"
      >
        {element.component}
      </div>
    </div>
  );
}
