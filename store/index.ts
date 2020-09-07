// Copyright FitBook

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { enableMapSet } from 'immer';
import { profileReducer } from './profiles';
import { statusReducer } from './status';
import fitlogReducer from './reducers/reducer';

enableMapSet();

export const rootReducer = combineReducers({
  profiles: profileReducer,
  ...statusReducer,
  fitlogReducer: fitlogReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const reduxStore = createStore(rootReducer, applyMiddleware(thunkMiddleware));

  return reduxStore;
}

export const store = configureStore();
