import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import AuthScreen from '../screens/user/AuthScreen';
import NotesScreen from '../screens/NotesScreen';
import { useDispatch } from 'react-redux';
import { SafeAreaView, Button, View, Platform } from 'react-native';
import * as authActions from '../store/actions/auth';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: '#343a40'
    },
    headerTintColor: 'bisque'
};

const DashboardNavigator = createStackNavigator({
    Dashboard: DashboardScreen,
    Workout: WorkoutScreen,
    Exercise: ExerciseScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const NotesNavigator = createStackNavigator({
    Notes: NotesScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
})

const tabScreenConfig = {
    Home: {
        screen: DashboardNavigator,
        navigationOptions: {
              tabBarIcon: tabInfo => {
                return (
                  <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
                );
              },
            //   tabBarColor: Colors.primaryColor
            title: 'Dashboard',
        }
    },
    Notes: {
        screen: NotesNavigator,
        navigationOptions: {
              tabBarIcon: tabInfo => {
                return <Ionicons name="ios-book" size={25} color={tabInfo.tintColor} />;
              },
            //   tabBarColor: Colors.accentColor
            title: 'Notes'
        }
    }
};

const DashboardTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeTintColor: Colors.headerFontColor,
            shifting: false,
            barStyle: {
                backgroundColor: Colors.headerBackground
            }
        })
        : createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                activeTintColor: Colors.buttonColor
            }
        });

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createSwitchNavigator({
    // Auth: AuthNavigator,
    Navigator: DashboardTabNavigator
});

export default createAppContainer(MainNavigator);