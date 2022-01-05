import { PayloadAction } from "@reduxjs/toolkit";

export function sliceLoaded<State, RecordType>(stateProperty: keyof State) {
  return (
    state: State,
    { payload: { values } }: PayloadAction<{ values: RecordType[] }>
  ) => {
    values.forEach((record: RecordType) => {
      // @ts-ignore
      state[stateProperty][record["_id"]] = record;
    });
  };
}

export function sliceAdded<State, RecordType>(stateProperty: keyof State) {
  return (
    state: State,
    { payload: { value } }: PayloadAction<{ value: RecordType }>
  ) => {
    // @ts-ignore
    state[stateProperty][value["_id"]] = value;
  };
}

export function sliceDeleted<State, RecordType>(stateProperty: keyof State) {
  return (
    state: State,
    { payload: { value } }: PayloadAction<{ value: RecordType }>
  ) => {
    // @ts-ignore
    delete state[stateProperty][value["_id"]];
  };
}

export function sliceUpdated<State, RecordType>(stateProperty: keyof State) {
  return (
    state: State,
    { payload: { value } }: PayloadAction<{ value: RecordType }>
  ) => {
    // @ts-ignore
    state[stateProperty][value["_id"]] = value;
  };
}
