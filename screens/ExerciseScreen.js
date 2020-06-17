import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { expandExercise } from '../store/actions';

const ExerciseScreen = props => {
    const selectedExercise = props.navigation.getParam('exercise');
    const logs = useSelector(state => state.logs);
    const workouts = useSelector(state => state.workouts);
    const category = props.navigation.getParam('workout');
    const userId = '5d7d6ce9e31bed84d467cdbe';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(expandExercise(workouts, category, selectedExercise, userId));
    }, []);

    return (
        <View style={styles.container}>
            <Text>Date Weight Unit Count</Text>
            {logs.map((exercise, idx) => {
                return (exercise.name.toLowerCase() == selectedExercise.toLowerCase() ?
            <Text key={idx}>{exercise.date}, {exercise.weight}, {exercise.unit}, {exercise.count}</Text> : null)
            })}
        </View>
    );
}

ExerciseScreen.navigationOptions = navigationData => {
    const exerciseTitle = navigationData.navigation.getParam('exercise');
    return {
        headerTitle: exerciseTitle
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

export default ExerciseScreen;