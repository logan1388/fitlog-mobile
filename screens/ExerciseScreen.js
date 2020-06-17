import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';
import { expandExercise } from '../store/actions';
import { Table, Row, Rows } from 'react-native-table-component';

const ExerciseScreen = props => {
    const selectedExercise = props.navigation.getParam('exercise');
    const logs = useSelector(state => state.logs);
    const workouts = useSelector(state => state.workouts);
    const category = props.navigation.getParam('workout');
    const userId = '5d7d6ce9e31bed84d467cdbe';
    const dispatch = useDispatch();

    const tableHead = ['Date & Time', 'Weight', 'Unit', 'Count'];
    const widthArr = [80, 30, 30, 30];
    const tableData = (logs.map(exercise => {
            console.log('Exercise ', exercise.date, exercise.weight, exercise.unit, exercise.count);
            return [exercise.date, exercise.weight, exercise.unit, exercise.count];
    }));

    console.log('TD ', tableData);

    useEffect(() => {
        dispatch(expandExercise(workouts, category, selectedExercise, userId));
    }, []);

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row data={tableHead} style={styles.head} flexArr={[2, 1, 1, 1]} textStyle={styles.text} />
                <Rows data={tableData} textStyle={styles.text} style={styles.row} flexArr={[2, 1, 1, 1]}/>
            </Table>
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
        paddingHorizontal: 20
    },
    header: {
        paddingHorizontal: 10
    },
    head: { height: 40, backgroundColor: 'lightgrey' },
    text: { margin: 6, textAlign: 'center' },
    row: {  height: 28  }
});

export default ExerciseScreen;