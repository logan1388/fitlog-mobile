import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import DashboardScreen from '../screens/DashboardScreen';
import WorkoutScreen from '../screens/WorkoutScreen';

const Navigator = createStackNavigator({
    Dashboard: DashboardScreen,
    Workout: WorkoutScreen
});

export default createAppContainer(Navigator);