// Copyright FitBook

import { ActionCreatorsMapObject } from 'redux';
import { rootReducer } from '.';

export interface Action {
  type: string;
  payload?: any;
}

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;

export type RootState = ReturnType<typeof rootReducer>;
