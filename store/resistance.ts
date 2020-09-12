// Copyright FitBook

import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import produce from 'immer';
import { ResistanceModel, CreateResistanceModel } from '../commonlib/models/ResistanceModel';
import { Action, ActionsUnion } from './actionHelpers';
import ResistanceController, { resistanceController } from '../domainlogic/controllers/resistance';
import { AppState } from '.';
import { isServiceResponse } from '../commonlib/models/ServiceResponse';
import { statusActions } from './status';

interface ResistanceState {
  resistance?: ResistanceModel[];
}

export const getInitialResistanceState = (): ResistanceState => {
  return {
    resistance: [],
  };
};

export enum ResistanceActionNames {
  FETCH_RESISTANCE = 'FETCH_RESISTANCE',
  RECEIVE_RESISTANCE = 'RECEIVE_RESISTANCE',
  ADD_RESISTANCE = 'ADD_RESISTANCE',
}

export const resistanceActions = {
  addResistance: (resistance: ResistanceModel): Action => ({
    type: ResistanceActionNames.ADD_RESISTANCE,
    payload: resistance,
  }),
  receiveResistance: (resistance: ResistanceModel): Action => ({
    type: ResistanceActionNames.RECEIVE_RESISTANCE,
    payload: { resistance },
  }),
};

export type Actions = ActionsUnion<typeof resistanceActions>;

export type ThunkActionCreator = ActionCreator<ThunkAction<void, AppState, ResistanceController, Actions>>;

export const fetchResistance: ThunkActionCreator = () => async (dispatch: Dispatch) => {
  dispatch(statusActions.setPending(ResistanceActionNames.FETCH_RESISTANCE));
  const r = await resistanceController.getMyProfile();
  dispatch(statusActions.resetPending(ResistanceActionNames.FETCH_RESISTANCE));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(ResistanceActionNames.FETCH_RESISTANCE, r));
  } else {
    dispatch(resistanceActions.receiveResistance(r));
    dispatch(statusActions.resetError(ResistanceActionNames.FETCH_RESISTANCE));
  }
};

export const addResistance: ThunkActionCreator = (data: CreateResistanceModel, onSuccessCallback: () => void) => async (
  dispatch: Dispatch
) => {
  dispatch(statusActions.setPending(ResistanceActionNames.ADD_RESISTANCE));
  const r = await resistanceController.addResistanceLog(data);
  dispatch(statusActions.resetPending(ResistanceActionNames.ADD_RESISTANCE));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(ResistanceActionNames.ADD_RESISTANCE, r));
  } else {
    dispatch(resistanceActions.receiveResistance(r));
    dispatch(statusActions.resetError(ResistanceActionNames.ADD_RESISTANCE));
    onSuccessCallback();
  }
};

export const resistanceReducer = (
  state: ResistanceState = getInitialResistanceState(),
  action: Actions
): ResistanceState => {
  switch (action.type) {
    case ResistanceActionNames.RECEIVE_RESISTANCE: {
      const { resistance } = action.payload;
      return produce(state, draft => {
        draft.resistance?.push(resistance);
      });
    }
    default:
      return state;
  }
};
