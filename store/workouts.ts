// Copyright FitBook

import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from './actionHelpers';
import produce from 'immer';
import {
  WorkoutModel,
  CreateWorkoutModel,
  WorkoutTypes,
  WorkoutHistoryModel,
  WorkoutSummaryModel,
} from '../commonlib/models/WorkoutModel';
import { Action, ActionsUnion } from './actionHelpers';
import WorkoutsController, { workoutsController } from '../domainlogic/controllers/workouts';
import { AppState } from '.';
import { isServiceResponse } from '../commonlib/models/ServiceResponse';
import { statusActions } from './status';

interface WorkoutsState {
  workouts: WorkoutModel[];
  workoutsHistory: WorkoutHistoryModel[];
  workoutsSummary: WorkoutSummaryModel[];
}

export const getInitialWorkoutsState = (): WorkoutsState => {
  return {
    workouts: [],
    workoutsHistory: [],
    workoutsSummary: [],
  };
};

export enum WorkoutsActionNames {
  FETCH_WORKOUTS = 'FETCH_WORKOUTS',
  RECEIVE_WORKOUTS_LIST = 'RECEIVE_WORKOUTS_LIST',
  ADD_WORKOUT = 'ADD_WORKOUT',
  FETCH_WORKOUTS_HISTORY = 'FETCH_WORKOUTS_HISTORY',
  FETCH_WORKOUTS_SUMMARY = 'FETCH_WORKOUTS_SUMMARY',
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
  fetchWorkoutsHistory: (workoutsHistory: WorkoutHistoryModel[]): Action => ({
    type: WorkoutsActionNames.FETCH_WORKOUTS_HISTORY,
    payload: { workoutsHistory },
  }),
  fetchWorkoutsSummary: (workoutsSummary: WorkoutSummaryModel[]): Action => ({
    type: WorkoutsActionNames.FETCH_WORKOUTS_SUMMARY,
    payload: { workoutsSummary },
  }),
};

export type Actions = ActionsUnion<typeof workoutActions>;

export type ThunkActionCreator = ActionCreator<ThunkAction<void, AppState, WorkoutsController, Actions>>;

export type ThunkActionDispatch = ThunkDispatch<RootState, WorkoutsController, Actions>;

export const fetchWorkoutsList: ThunkActionCreator = (type: WorkoutTypes, subType: string, userId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(statusActions.setPending(WorkoutsActionNames.FETCH_WORKOUTS));
  const r = await workoutsController.getWorkoutsList(type, subType, userId);
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
    dispatch(fetchWorkoutsList(data.type, data.subType, data.userId));
    dispatch(fetchWorkoutsSummary(data.userId));
    dispatch(statusActions.resetError(WorkoutsActionNames.ADD_WORKOUT));
  }
};

export const fetchWorkoutsHistory: ThunkActionCreator = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(statusActions.setPending(WorkoutsActionNames.FETCH_WORKOUTS_HISTORY));
  const r = await workoutsController.getWorkoutsHistory(userId);
  dispatch(statusActions.resetPending(WorkoutsActionNames.FETCH_WORKOUTS_HISTORY));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(WorkoutsActionNames.FETCH_WORKOUTS_HISTORY, r));
  } else {
    dispatch(workoutActions.fetchWorkoutsHistory(r));
    dispatch(statusActions.resetError(WorkoutsActionNames.FETCH_WORKOUTS_HISTORY));
  }
};

export const fetchWorkoutsSummary: ThunkActionCreator = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(statusActions.setPending(WorkoutsActionNames.FETCH_WORKOUTS_SUMMARY));
  const r = await workoutsController.getWorkoutsSummary(userId);
  dispatch(statusActions.resetPending(WorkoutsActionNames.FETCH_WORKOUTS_SUMMARY));

  if (isServiceResponse(r)) {
    dispatch(statusActions.setError(WorkoutsActionNames.FETCH_WORKOUTS_SUMMARY, r));
  } else {
    dispatch(workoutActions.fetchWorkoutsSummary(r));
    dispatch(statusActions.resetError(WorkoutsActionNames.FETCH_WORKOUTS_SUMMARY));
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
    case WorkoutsActionNames.FETCH_WORKOUTS_HISTORY: {
      const { workoutsHistory } = action.payload;
      return produce(state, draft => {
        draft.workoutsHistory = workoutsHistory;
      });
    }
    case WorkoutsActionNames.FETCH_WORKOUTS_SUMMARY: {
      const { workoutsSummary } = action.payload;
      return produce(state, draft => {
        draft.workoutsSummary = workoutsSummary;
      });
    }
    default:
      return state;
  }
};
