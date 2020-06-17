import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { fetchExercises } from '../store/actions';

const WorkoutScreen = props => {
    const selectedWorkout = props.navigation.getParam('workout');
    const workouts = useSelector(state => state.workouts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExercises(selectedWorkout));
    }, []);

    return (
        <View style={styles.container}>
            {workouts.map((workout, idx) => { 
                return (workout.category.toLowerCase() == selectedWorkout.toLowerCase() ?
                <Button 
                    style={styles.button} 
                    key={idx} 
                    title={workout.name} 
                    onPress={() => props.navigation.navigate({routeName: 'Exercise', params: {
                        exercise: workout.name,
                        workout: selectedWorkout
                    }})} /> : null)
            })}
        </View>
    );
}

WorkoutScreen.navigationOptions = navigationData => {
    const workoutTitle = navigationData.navigation.getParam('workout');
    return {
        headerTitle: workoutTitle
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