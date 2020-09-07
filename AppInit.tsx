// Copyright FitBook

import React from 'react';
import { useDispatch } from 'react-redux';
import { Style } from './styles/style';
import { setTheme } from './store/actions/actions';

interface AppInitProps {
  children: React.ReactElement;
}

const AppInit: React.FC<AppInitProps> = props => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchConfigFromStorage = async () => {
      await Style.computeCurrentTheme();
      dispatch(setTheme(Style.getCurrentTheme()));
      setIsInitialized(true);
    };

    fetchConfigFromStorage();
  }, [dispatch, setIsInitialized]);

  if (isInitialized) {
    return props.children;
  }

  return null;
};

export default AppInit;
