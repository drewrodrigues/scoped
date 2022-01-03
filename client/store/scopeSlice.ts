import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { SavedType } from "../data/couchModel";
import { Scope } from "../data/scope";
import { RootState } from "./store";

export interface ScopeState {
  selectedScopeId: string | null;
  scopeRecords: Record<string, SavedType<Scope>>;
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
      }: PayloadAction<{ scopes: SavedType<Scope>[]; selectedScopeId: string }>
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
      }: PayloadAction<{ selectedScopeId: string }>
    ) => {
      state.selectedScopeId = selectedScopeId;
    },
    scopeCreated: (
      state,
      { payload: { scope } }: PayloadAction<{ scope: SavedType<Scope> }>
    ) => {
      state.scopeRecords[scope._id] = scope;
    },
    scopeUpdated: (
      state,
      { payload: scope }: PayloadAction<SavedType<Scope>>
    ) => {
      state.scopeRecords[scope._id] = scope;
    },
  },
});

export function useSelectedScope() {
  const { scopeRecords, selectedScopeId } = useSelector(
    (state: RootState) => state.scope
  );
  for (const scopeId in scopeRecords) {
    const scope = scopeRecords[scopeId];
    if (scope._id === selectedScopeId) {
      return scope;
    }
  }
  return null;
}

export function useAllScopes() {
  const { scopeRecords } = useSelector((state: RootState) => state.scope);
  return Object.values(scopeRecords);
}

// Action creators are generated for each case reducer function
export const { scopesLoaded, scopeSelected, scopeCreated, scopeUpdated } =
  scopeSlice.actions;

export default scopeSlice.reducer;
