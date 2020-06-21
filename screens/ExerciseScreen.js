import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { expandExercise, maxWeight } from '../store/actions';
import { Table, Row, Rows } from 'react-native-table-component';
import WorkoutInput from '../components/workoutInput';
import BackImg from '../assets/back-workout.jpg';

const ExerciseScreen = props => {
    const selectedExercise = props.navigation.getParam('exercise');
    const logs = useSelector(state => state.logs);
    const workouts = useSelector(state => state.workouts);
    const maxWt = useSelector(state => state.maxWeight);
    const category = props.navigation.getParam('workout');
    const userId = '5d7d6ce9e31bed84d467cdbe';
    const dispatch = useDispatch();

    const tableHead = ['Date & Time', 'Weight', 'Unit', 'Count'];
    const tableData = logs.map(exercise => [exercise.date, exercise.weight, exercise.unit, exercise.count]);

    useEffect(() => {
        dispatch(expandExercise(workouts, category, selectedExercise, userId));
        dispatch(maxWeight(userId, category, selectedExercise));
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={BackImg} style={styles.image}>
                <View style={styles.innerContainer}>
                    <WorkoutInput category={category} name={selectedExercise} logs={logs} workouts={workouts} />
                    {maxWt && <Text style={styles.maxwt}>
                        <Text style={styles.maxwtText}>Max Weight: </Text>
                        <Text>{maxWt.weight} </Text>
                        <Text>{maxWt.unit} </Text>
                        <Text style={styles.maxwtText}>Count: </Text>
                        <Text>{maxWt.count}</Text>
                    </Text>}
                    {tableData && tableData.length > 0 ?
                        <React.Fragment>
                            <Table borderStyle={{ borderWidth: 1, borderColor: 'transparent' }}>
                                <Row data={tableHead} style={styles.head} flexArr={[2, 1, 1, 1]} textStyle={styles.headText} />
                            </Table>
                            <ScrollView>
                                <Table borderStyle={{ borderWidth: 1, borderColor: 'transparent' }}>
                                    <Rows data={tableData} textStyle={styles.text} style={styles.row} flexArr={[2, 1, 1, 1]} />
                                </Table>
                            </ScrollView>
                        </React.Fragment> : 
                        <Text style={styles.start}>Start Logging!</Text>}
                </View>
            </ImageBackground>
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
    },
    innerContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%'
    },
    header: {
        paddingHorizontal: 10
    },
    image: {
        flex: 1
    },
    overlay: {
        backgroundColor: 'rgba(255,0,0,0.5)',
    },
    maxwt: { height: 40, textAlign: 'center' },
    maxwtText: { fontWeight: 'bold' },
    head: { height: 40, backgroundColor: 'lightgrey' },
    headText: { margin: 6, textAlign: 'center', fontWeight: 'bold' },
    text: { margin: 6, textAlign: 'center' },
    row: { height: 40 },
    start: {
        flex: 1,
        textAlign: 'center',
        marginTop: 90,
        fontWeight: 'bold'
    },
});

export default ExerciseScreen;