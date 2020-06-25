import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import AuthScreen from '../screens/user/AuthScreen';
import { useDispatch } from 'react-redux';
import { SafeAreaView, Button, View } from 'react-native';
import * as authActions from '../store/actions/auth';

const DashboardNavigator = createStackNavigator({
    Dashboard: DashboardScreen,
    Workout: WorkoutScreen,
    Exercise: ExerciseScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#343a40'
        },
        headerTintColor: 'bisque'
    }
});

const Navigator = createDrawerNavigator({
    Home: DashboardNavigator
},
    {
        contentOptions: {
            activeTintColor: 'lightgrey'
        },
        contentComponent: props => {
            const dispatch = useDispatch();
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
                        <DrawerItems {...props} />
                        <Button
                            title="Logout"
                            color='lightgrey'
                            onPress={() => {
                                dispatch(authActions.logout());
                                props.navigation.navigate('Auth');
                            }}
                        />
                    </SafeAreaView>
                </View>
            );
        }
    }
);

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#343a40'
        },
        headerTintColor: 'bisque'
    }
});

const MainNavigator = createSwitchNavigator({
    Auth: AuthNavigator,
    Navigator: Navigator
});

export default createAppContainer(MainNavigator);