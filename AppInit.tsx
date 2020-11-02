// Copyright FitBook

import React from 'react';
import { useDispatch } from 'react-redux';
import { Style } from './styles/style';
import { setTheme } from './store/actions/actions';
import auth from '@react-native-firebase/auth';

interface AppInitProps {
  children: React.ReactElement;
}

const AuthenticateUser = async () => {
  try {
    const response = await auth().signInAnonymously();
    return response;
  } catch (error) {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }

    console.error(error);
  }
};

const AppInit: React.FC<AppInitProps> = props => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<string | null>('');
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchConfigFromStorage = async () => {
      await Style.computeCurrentTheme();
      dispatch(setTheme(Style.getCurrentTheme()));

      const user = await AuthenticateUser();
      if (user) {
        setCurrentUser(user.user.displayName);
        console.log(user.user.uid);
      }

      setIsInitialized(true);
    };

    fetchConfigFromStorage();
  }, [currentUser, dispatch, setIsInitialized]);

  if (isInitialized) {
    return props.children;
  }

  return null;
};

export default AppInit;
