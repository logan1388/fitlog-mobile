import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { FitbookNavigator, AuthNavigator } from './Navigator';

const AppNavigator = props => {
    const isAuth = useSelector(state => state.fitlogReducer.isAuthenticated);

    return (
        <NavigationContainer>
            {isAuth && <FitbookNavigator />}
            {!isAuth && <AuthNavigator />}
        </NavigationContainer>
    );
};

export default AppNavigator;