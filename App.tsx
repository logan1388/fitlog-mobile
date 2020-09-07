import React from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import { store } from './store';
import AppInit from './AppInit';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <AppInit>
        <AppNavigator />
      </AppInit>
    </Provider>
  );
}
