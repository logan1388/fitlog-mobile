import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ExerciseScreen from '../screens/ExerciseScreen';
import AuthScreen from '../screens/user/AuthScreen';

const Navigator = createStackNavigator({
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
    Dashboard: Navigator
});

export default createAppContainer(MainNavigator);