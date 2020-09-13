// Copyright FitBook

import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from './actionHelpers';
import produce from 'immer';
import { WorkoutModel, CreateWorkoutModel, WorkoutTypes, WorkoutSubTypes } from '../commonlib/models/WorkoutModel';
import { Action, ActionsUnion } from './actionHelpers';
import WorkoutsController, { workoutsController } from '../domainlogic/controllers/workouts';
import { AppState } from '.';
import { isServiceResponse } from '../commonlib/models/ServiceResponse';
import { statusActions } from './status';

interface WorkoutsState {
  workouts: WorkoutModel[];
}

export const getInitialWorkoutsState = (): WorkoutsState => {
  return {
    workouts: [],
  };
};

export enum WorkoutsActionNames {
  FETCH_WORKOUTS = 'FETCH_WORKOUTS',
  RECEIVE_WORKOUTS_LIST = 'RECEIVE_WORKOUTS_LIST',
  ADD_WORKOUT = 'ADD_WORKOUT',
}

export const workoutActions = {
  addWorkout: (workout: WorkoutModel): Action => ({
    type: WorkoutsActionNames.ADD_WORKOUT,
    payload: workout,
  }),
  receiveWorkouts: (workouts: WorkoutModel[]): Action => ({
    type: WorkoutsActionNames.RECEIVE_WORKOUTS_LIST,
    payload: { workouts },
  }),
};

export type Actions = ActionsUnion<typeof workoutActions>;

export type ThunkActionCreator = ActionCreator<ThunkAction<void, AppState, WorkoutsController, Actions>>;

export type ThunkActionDispatch = ThunkDispatch<RootState, WorkoutsController, Actions>;

export const fetchWorkoutsList: ThunkActionCreator = (workoutType: WorkoutTypes, WorkoutSubType: WorkoutSubTypes, userId: string) => async (
  dispatch: Dispatch
) => {
  console.log(workoutType, ' ', WorkoutSubType);
  dispatch(statusActions.setPending(WorkoutsActionNames.FETCH_WORKOUTS));
  const r = await workoutsController.getWorkoutsList(workoutType, WorkoutSubType, userId);
  dispatch(statusActions.resetPending(WorkoutsActionNames.FETCH_WORKOUTS));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(WorkoutsActionNames.FETCH_WORKOUTS, r));
  } else {
    dispatch(workoutActions.receiveWorkouts(r));
    dispatch(statusActions.resetError(WorkoutsActionNames.FETCH_WORKOUTS));
  }
};

export const addWorkout: ThunkActionCreator = (data: CreateWorkoutModel) => async (
  dispatch: Dispatch & ThunkActionDispatch
) => {
  dispatch(statusActions.setPending(WorkoutsActionNames.ADD_WORKOUT));
  const r = await workoutsController.createWorkout(data);
  dispatch(statusActions.resetPending(WorkoutsActionNames.ADD_WORKOUT));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(WorkoutsActionNames.ADD_WORKOUT, r));
  } else {
    dispatch(fetchWorkoutsList(data.type, data.userId));
    dispatch(statusActions.resetError(WorkoutsActionNames.ADD_WORKOUT));
  }
};

export const resetWorkoutsList: ThunkActionCreator = () => (dispatch: Dispatch) => {
  dispatch(workoutActions.receiveWorkouts([]));
};

export const workoutReducer = (state: WorkoutsState = getInitialWorkoutsState(), action: Actions): WorkoutsState => {
  switch (action.type) {
    case WorkoutsActionNames.RECEIVE_WORKOUTS_LIST: {
      const { workouts } = action.payload;
      return produce(state, draft => {
        draft.workouts = workouts;
      });
    }
    default:
      return state;
  }
};
