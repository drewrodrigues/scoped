import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PopoverElement {
  x: number;
  y: number;
  component: JSX.Element;
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
