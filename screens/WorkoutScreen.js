import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const WorkoutScreen = props => {
    const selectedWorkout = props.navigation.getParam('workout').toLowerCase();
    const workouts = [
        { category: 'Chest', name: 'Bench Press' },
        { category: 'Chest', name: 'Incline Press' },
        { category: 'Chest', name: 'Decline Press' },
        { category: 'Chest', name: 'Pec Deck' },
        { category: 'Chest', name: 'Pull over' },
    ];
    return (
        <View style={styles.container}>
            {workouts.map((workout, idx) => { 
                return (workout.category.toLowerCase() == selectedWorkout ?
                <Button 
                    style={styles.button} 
                    key={idx} 
                    title={workout.name} 
                    onPress={() => props.navigation.navigate({routeName: 'Workout', params: {
                        workout: workout.name
                    }})} /> : null)
            })}
        </View>
    );
}

WorkoutScreen.navigationOptions = navigationData => {
    const workoutTitle = navigationData.navigation.getParam('workout');
    return {
        headerTitle: workoutTitle,
        headerStyle: {
            backgroundColor: '#343a40'
        },
        headerTintColor: 'bisque'
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 50,
        paddingHorizontal: 50
    },
    button: {
    }
});

export default WorkoutScreen;