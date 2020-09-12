// Copyright FitBook

import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from './actionHelpers';
import produce from 'immer';
import { ResistanceModel, CreateResistanceModel } from '../commonlib/models/ResistanceModel';
import { Action, ActionsUnion } from './actionHelpers';
import ResistanceController, { resistanceController } from '../domainlogic/controllers/resistance';
import { AppState } from '.';
import { isServiceResponse } from '../commonlib/models/ServiceResponse';
import { statusActions } from './status';

interface ResistanceState {
  resistances: ResistanceModel[];
}

export const getInitialResistanceState = (): ResistanceState => {
  return {
    resistances: [],
  };
};

export enum ResistanceActionNames {
  FETCH_RESISTANCE = 'FETCH_RESISTANCE',
  RECEIVE_RESISTANCE_LIST = 'RECEIVE_RESISTANCE_LIST',
  ADD_RESISTANCE = 'ADD_RESISTANCE',
}

export const resistanceActions = {
  addResistance: (resistance: ResistanceModel): Action => ({
    type: ResistanceActionNames.ADD_RESISTANCE,
    payload: resistance,
  }),
  receiveResistance: (resistances: ResistanceModel[]): Action => ({
    type: ResistanceActionNames.RECEIVE_RESISTANCE_LIST,
    payload: { resistances },
  }),
};

export type Actions = ActionsUnion<typeof resistanceActions>;

export type ThunkActionCreator = ActionCreator<ThunkAction<void, AppState, ResistanceController, Actions>>;

export type ThunkActionDispatch = ThunkDispatch<RootState, ResistanceController, Actions>;

export const fetchResistanceList: ThunkActionCreator = () => async (dispatch: Dispatch) => {
  dispatch(statusActions.setPending(ResistanceActionNames.FETCH_RESISTANCE));
  const r = await resistanceController.getResistanceLogs();
  dispatch(statusActions.resetPending(ResistanceActionNames.FETCH_RESISTANCE));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(ResistanceActionNames.FETCH_RESISTANCE, r));
  } else {
    dispatch(resistanceActions.receiveResistance(r));
    dispatch(statusActions.resetError(ResistanceActionNames.FETCH_RESISTANCE));
  }
};

export const addResistance: ThunkActionCreator = (data: CreateResistanceModel, onSuccessCallback: () => void) => async (
  dispatch: Dispatch & ThunkActionDispatch
) => {
  dispatch(statusActions.setPending(ResistanceActionNames.ADD_RESISTANCE));
  const r = await resistanceController.addResistanceLog(data);
  dispatch(statusActions.resetPending(ResistanceActionNames.ADD_RESISTANCE));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(ResistanceActionNames.ADD_RESISTANCE, r));
  } else {
    dispatch(fetchResistanceList());
    dispatch(statusActions.resetError(ResistanceActionNames.ADD_RESISTANCE));
    onSuccessCallback();
  }
};

export const resistanceReducer = (
  state: ResistanceState = getInitialResistanceState(),
  action: Actions
): ResistanceState => {
  switch (action.type) {
    case ResistanceActionNames.RECEIVE_RESISTANCE_LIST: {
      const { resistances } = action.payload;
      return produce(state, draft => {
        draft.resistances = resistances;
      });
    }
    default:
      return state;
  }
};
