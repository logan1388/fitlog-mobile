import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import WorkoutTypesScreen, { screenOptions as workoutTypesScreenOptions } from '../screens/workouts/WorkoutTypesScreen';
import WorkoutSubTypesScreen, {
  screenOptions as workoutSubTypesScreenOptions,
} from '../screens/workouts/WorkoutSubTypesScreen';
import ExerciseScreen, { screenOptions as exerciseScreenOptions } from '../screens/ExerciseScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import ResistanceScreen, { screenOptions as resistanceScreenOptions } from '../screens/resistance/ResistanceScreen';
import ResistancelogScreen, {
  screenOptions as resistancelogScreenOptions,
} from '../screens/resistance/ResistancelogScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/colors';
import HomeScreen, { screenOptions as homeScreenOptions } from '../screens/HomeScreen';
import Profile from '../screens/profile/ProfileScreen';
import AwardsScreen from '../screens/AwardsScreen';
import EditProfile from '../screens/profile/EditProfileScreen';
import {
  ResistanceStackRouteParams,
  ResistanceStackScreens,
  ProfileStackRouteParams,
  ProfileStackScreens,
} from './NavigatorTypes';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: '#343a40',
  },
  headerTintColor: 'bisque',
};

const AwardsStackNavigator = createStackNavigator();
const AwardsNavigator = () => {
  return (
    <AwardsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AwardsStackNavigator.Screen name="Awards" component={AwardsScreen} />
    </AwardsStackNavigator.Navigator>
  );
};

const TopTab = createMaterialTopTabNavigator();
const ExerciseTabNavigator = () => {
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.headerFontColor,
        inactiveTintColor: Colors.buttonColor,
        style: { backgroundColor: Colors.headerBackground },
        indicatorStyle: { backgroundColor: Colors.headerFontColor },
      }}>
      <TopTab.Screen name="Exercise" component={ExerciseScreen} />
      <TopTab.Screen name="Awards" component={AwardsNavigator} />
    </TopTab.Navigator>
  );
};

const ResistanceStackNavigator = createStackNavigator<ResistanceStackRouteParams>();
const ResistanceNavigator = () => {
  return (
    <ResistanceStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <ResistanceStackNavigator.Screen
        name={ResistanceStackScreens.ResistanceScreen}
        component={ResistanceScreen}
        options={resistanceScreenOptions}
      />
      <ResistanceStackNavigator.Screen
        name={ResistanceStackScreens.ResistancelogScreen}
        component={ResistancelogScreen}
        options={resistancelogScreenOptions}
      />
    </ResistanceStackNavigator.Navigator>
  );
};

export type WorkoutStackRouteParams = {
  WorkoutTypes: undefined;
  WorkoutSubTypes: {
    type: string;
  };
  Workoutlog: {
    type: string;
    exercise: string;
  };
};

export enum WorkoutStackScreens {
  WorkoutTypesScreen = 'WorkoutTypes',
  WorkoutSubTypesScreen = 'WorkoutSubTypes',
  WorkoutlogScreen = 'Workoutlog',
}

const WorkoutStackNavigator = createStackNavigator<WorkoutStackRouteParams>();
const WorkoutNavigator = () => {
  return (
    <WorkoutStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <WorkoutStackNavigator.Screen
        name={WorkoutStackScreens.WorkoutTypesScreen}
        component={WorkoutTypesScreen}
        options={workoutTypesScreenOptions}
      />
      <WorkoutStackNavigator.Screen
        name={WorkoutStackScreens.WorkoutSubTypesScreen}
        component={WorkoutSubTypesScreen}
        options={workoutSubTypesScreenOptions}
      />
      <WorkoutStackNavigator.Screen
        name={WorkoutStackScreens.WorkoutlogScreen}
        component={ExerciseTabNavigator}
        options={exerciseScreenOptions}
      />
    </WorkoutStackNavigator.Navigator>
  );
};

const HomeStackNavigator = createStackNavigator();
const HomeNavigator = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <HomeStackNavigator.Screen name="Home" component={HomeScreen} options={homeScreenOptions} />
    </HomeStackNavigator.Navigator>
  );
};

const ProfileStackNavigator = createStackNavigator<ProfileStackRouteParams>();
const ProfileNavigator = () => {
  const { t } = useTranslation();
  return (
    <ProfileStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <ProfileStackNavigator.Screen
        name={ProfileStackScreens.ProfileScreen}
        options={{ title: t('header.profile') }}
        component={Profile}
      />
      <ProfileStackNavigator.Screen
        name={ProfileStackScreens.EditProfileScreen}
        options={{ title: t('header.editProfile') }}
        component={EditProfile}
      />
    </ProfileStackNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={authScreenOptions} />
    </AuthStackNavigator.Navigator>
  );
};

const Tab = createBottomTabNavigator();
export const FitbookNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Icon name="home" size={25} color={color} />;
          } else if (route.name === 'Resistance') {
            return <Icon name="dumbbell" size={25} color={color} />;
          } else if (route.name === 'Workouts') {
            return <Icon name="dumbbell" size={25} color={color} />;
          } else if (route.name === 'Awards') {
            return <Icon name="trophy" size={25} color={color} />;
          } else if (route.name === 'Profile') {
            return <Icon name="trophy" size={24} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.headerFontColor,
        inactiveTintColor: Colors.buttonColor,
        style: { backgroundColor: Colors.headerBackground },
        safeAreaInset: { bottom: 'never', top: 'never' },
      }}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Resistance" component={ResistanceNavigator} />
      <Tab.Screen name="Workouts" component={WorkoutNavigator} />
      <Tab.Screen name="Awards" component={AwardsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};
