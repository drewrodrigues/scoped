import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { ISavedScope } from "../data/modelTypes";
import { RootState } from "./store";

export interface ScopeState {
  selectedScopeId: string | null;
  scopeRecords: Record<string, ISavedScope>;
}

const initialState: ScopeState = {
  selectedScopeId: null,
  scopeRecords: {},
};

export const scopeSlice = createSlice({
  name: "scope",
  initialState,
  reducers: {
    scopesLoaded: (
      state,
      {
        payload: { scopes, selectedScopeId },
      }: PayloadAction<{
        scopes: ISavedScope[];
        selectedScopeId: string | null;
      }>
    ) => {
      scopes.forEach((scope) => {
        state.scopeRecords[scope._id] = scope;
      });
      state.selectedScopeId = selectedScopeId;
    },
    scopeSelected: (
      state,
      {
        payload: { selectedScopeId },
      }: PayloadAction<{ selectedScopeId: string | null }>
    ) => {
      state.selectedScopeId = selectedScopeId;
    },
    scopeCreated: (
      state,
      { payload: { scope } }: PayloadAction<{ scope: ISavedScope }>
    ) => {
      state.scopeRecords[scope._id] = scope;
    },
    scopeUpdated: (state, { payload: scope }: PayloadAction<ISavedScope>) => {
      state.scopeRecords[scope._id] = scope;
    },
  },
});

export function useSelectedScope(): ISavedScope | undefined {
  const { scopeRecords, selectedScopeId } = useSelector(
    (state: RootState) => state.scope
  );
  for (const scopeId in scopeRecords) {
    const scope = scopeRecords[scopeId];
    if (scope._id === selectedScopeId) {
      return scope as ISavedScope;
    }
  }
  return undefined;
}

export function useAllScopes() {
  const { scopeRecords } = useSelector((state: RootState) => state.scope);
  return Object.values(scopeRecords).sort((a: any, b: any) =>
    a.title.localeCompare(b.title)
  );
}

// Action creators are generated for each case reducer function
export const { scopesLoaded, scopeSelected, scopeCreated, scopeUpdated } =
  scopeSlice.actions;

export default scopeSlice.reducer;
