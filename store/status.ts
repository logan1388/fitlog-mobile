// Copyright FitBook

import { AnyAction } from 'redux';
import produce from 'immer';
import { ActionsUnion, RootState } from './actionHelpers';

export enum ActionNames {
  SET_ERROR = 'SET_ERROR',
  RESET_ERROR = 'RESET_ERROR',
  SET_PENDING = 'SET_PENDING',
  RESET_PENDING = 'RESET_PENDING',
}

export const statusActions = {
  setError: <E = any>(actionId: string, error: E) => ({
    type: ActionNames.SET_ERROR,
    payload: { actionId, error },
  }),

  resetError: (actionId: string) => ({
    type: ActionNames.RESET_ERROR,
    payload: actionId,
  }),

  setPending: (actionId: string) => ({
    type: ActionNames.SET_PENDING,
    payload: actionId,
  }),

  resetPending: (actionId: string) => ({
    type: ActionNames.RESET_PENDING,
    payload: actionId,
  }),
};

export type Actions = ActionsUnion<typeof statusActions>;

const pendingState = new Set<string>();

const pendingReducer = produce((state: Set<string>, action: AnyAction) => {
  if (action.type === ActionNames.SET_PENDING) {
    const actionId = action.payload;
    state.add(actionId);
  } else if (action.type === ActionNames.RESET_PENDING) {
    const actionId = action.payload;
    state.delete(actionId);
  }
}, pendingState);

const errorState = new Map<string, any>();

const errorReducer = produce((state: Map<string, any>, action: AnyAction) => {
  if (action.type === ActionNames.SET_ERROR) {
    const { actionId, error } = action.payload;
    state.set(actionId, error);
  } else if (action.type === ActionNames.RESET_ERROR) {
    const actionId = action.payload;
    state.delete(actionId);
  }
}, errorState);

export const statusReducer = {
  error: errorReducer,
  pending: pendingReducer,
};

const getErrorState = (state: RootState) => state.error;
const getPendingState = (state: RootState) => state.pending;
const getError = <E = any>(state: RootState, actionId: string) => getErrorState(state).get(actionId) as E;
const getPending = (state: RootState, actionId: string) => getPendingState(state).has(actionId);

export const statusSelectors = {
  getError,
  getPending,
};
