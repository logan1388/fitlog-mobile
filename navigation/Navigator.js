import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';
import ExerciseScreen from '../screens/ExerciseScreen';

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

export default createAppContainer(Navigator);