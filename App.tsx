import React from 'react';
import { enableScreens } from 'react-native-screens';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import fitlogReducer from './store/reducers/reducer';
import thunk from 'redux-thunk';

enableScreens();

const rootReducer = combineReducers({
  fitlogReducer: fitlogReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
