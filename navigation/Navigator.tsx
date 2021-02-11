import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import WorkoutTypesScreen, { screenOptions as workoutTypesScreenOptions } from '../screens/workouts/WorkoutTypesScreen';
import WorkoutSubTypesScreen, {
  screenOptions as workoutSubTypesScreenOptions,
} from '../screens/workouts/WorkoutSubTypesScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import ResistanceScreen, { screenOptions as resistanceScreenOptions } from '../screens/resistance/ResistanceScreen';
import ResistancelogScreen, {
  screenOptions as resistancelogScreenOptions,
} from '../screens/resistance/ResistancelogScreen';
import WorkoutlogScreen, { screenOptions as workoutlogScreenOptions } from '../screens/workouts/WorkoutlogScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/colors';
import DashboardScreen, { screenOptions as dashboardScreenOptions } from '../screens/dashboard/DashboardScreen';
import Profile from '../screens/profile/ProfileScreen';
import AwardsScreen from '../screens/AwardsScreen';
import GraphScreen from '../screens/GraphScreen';
import EditProfile from '../screens/profile/EditProfileScreen';
import {
  DashboardStackRouteParams,
  DashboardStackScreens,
  ResistanceStackRouteParams,
  ResistanceStackScreens,
  WorkoutStackRouteParams,
  WorkoutStackScreens,
  ProfileStackRouteParams,
  ProfileStackScreens,
  WorkoutSubTypeStackRouteParams,
  WorkoutSubTypeStackScreens,
  ExerciseTabNavigatorParams,
} from './NavigatorTypes';

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },
  headerTintColor: 'black',
};

const AwardsStackNavigator = createStackNavigator();
const AwardsNavigator = () => {
  return (
    <AwardsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <AwardsStackNavigator.Screen name="Awards" component={AwardsScreen} />
    </AwardsStackNavigator.Navigator>
  );
};

const GraphStackNavigator = createStackNavigator();
const GraphNavigator = () => {
  return (
    <GraphStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <GraphStackNavigator.Screen name="Graph" component={GraphScreen} />
    </GraphStackNavigator.Navigator>
  );
};

const TopTab = createMaterialTopTabNavigator<WorkoutSubTypeStackRouteParams>();
const ExerciseTabNavigator = (exerciseProps: ExerciseTabNavigatorParams) => {
  const { type, subType } = exerciseProps.route.params;
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: Colors.headerFontColor,
        inactiveTintColor: Colors.buttonColor,
        style: { backgroundColor: Colors.headerBackground },
        indicatorStyle: { backgroundColor: Colors.headerFontColor },
      }}>
      <TopTab.Screen name={WorkoutSubTypeStackScreens.ExerciseScreen}>
        {props => <WorkoutlogScreen {...props} type={type} subType={subType} />}
      </TopTab.Screen>
      <TopTab.Screen name={WorkoutSubTypeStackScreens.GraphScreen} component={GraphNavigator} />
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
        options={workoutlogScreenOptions}
      />
    </WorkoutStackNavigator.Navigator>
  );
};

const DashboardStackNavigator = createStackNavigator<DashboardStackRouteParams>();
const DashboardNavigator = () => {
  return (
    <DashboardStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <DashboardStackNavigator.Screen
        name={DashboardStackScreens.Dashboard}
        component={DashboardScreen}
        options={dashboardScreenOptions}
      />
    </DashboardStackNavigator.Navigator>
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
          if (route.name === 'Dashboard') {
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
        activeTintColor: 'steelblue',
        inactiveTintColor: Colors.buttonColor,
        style: { backgroundColor: Colors.headerBackground },
        safeAreaInset: { bottom: 'never', top: 'never' },
      }}>
      <Tab.Screen name="Dashboard" component={DashboardNavigator} />
      <Tab.Screen name="Resistance" component={ResistanceNavigator} />
      <Tab.Screen name="Workouts" component={WorkoutNavigator} />
      <Tab.Screen name="Awards" component={AwardsNavigator} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
};
