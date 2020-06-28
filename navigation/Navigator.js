import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import AuthScreen from '../screens/user/AuthScreen';
import NotesScreen from '../screens/NotesScreen';
import { SafeAreaView, Button, View, Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import Planner from '../screens/Planner';
import AwardsScreen from '../screens/AwardsScreen';

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

const HomeNavigator = createStackNavigator({
    Home: HomeScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const PlannerNavigator = createStackNavigator({
    Planner: Planner
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const AwardsNavigator = createStackNavigator({
    Awards: AwardsScreen
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
        screen: HomeNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name="ios-home" size={25} color={tabInfo.tintColor} />
                );
            },
            title: 'Home'
        }
    },
    Planner: {
        screen: PlannerNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <FontAwesome name="calendar" size={25} color={tabInfo.tintColor} />);
            },
            title: 'Planner'
        }
    },
    Workouts: {
        screen: DashboardNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <MaterialCommunityIcons name="dumbbell" size={25} color={tabInfo.tintColor} />
                );
            },
            title: 'Workouts'
        }
    },
    Awards: {
        screen: AwardsNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return (
                    <FontAwesome name="trophy" size={25} color={tabInfo.tintColor} />);
            },
            title: 'Awards'
        }
    },
    Notes: {
        screen: NotesNavigator,
        navigationOptions: {
            tabBarIcon: tabInfo => {
                return <Ionicons name="ios-book" size={25} color={tabInfo.tintColor} />;
            },
            title: 'Notes'
        }
    }
};

const DashboardTabNavigator =
    Platform.OS === 'android'
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeColor: Colors.headerFontColor,
            inactiveColor: Colors.buttonColor,
            shifting: false,
            barStyle: {
                backgroundColor: Colors.headerBackground
            }
        })
        : createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                activeTintColor: Colors.headerFontColor,
                inactiveTintColor: Colors.buttonColor,
                tabStyle: {
                    backgroundColor: Colors.headerBackground
                }
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