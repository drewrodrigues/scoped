import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IconType } from "react-icons/lib";

interface GenericAction {}
export interface PopoverElement {
  x?: number;
  y?: number;
  component?: any;
  customActions?: { action: () => void; label: string; Icon: IconType }[];
  editAction?: () => void;
  deleteAction?: () => void;
  popoverId?: string | number;
  direction?: "left" | "right";
  onDismiss?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface PopoverState {
  element: PopoverElement | null;
}

const initialState: PopoverState = {
  element: null,
};

export const popoverSlice = createSlice({
  name: "popover",
  initialState,
  reducers: {
    showPopover: (state, { payload }: PayloadAction<PopoverElement>) => {
      state.element = payload;
    },
    hidePopover: (state) => {
      state.element = null;
    },
  },
});

export const { showPopover, hidePopover } = popoverSlice.actions;

export default popoverSlice.reducer;
