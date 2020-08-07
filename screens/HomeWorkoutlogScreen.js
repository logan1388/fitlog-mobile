import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import BackImg from '../assets/back-workout.jpg';
import NumericInput from 'react-native-numeric-input';
import { MaterialIcons } from '@expo/vector-icons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { getTimestamp } from '../utils/getTimeStamp';

const HomeWorkoutlogScreen = props => {
    const [count, setCount] = useState(0);
    const [weight, setWeight] = useState(0);
    const [time, setTime] = useState(0);
    const [stopwatchStart, setStopWatchStart] = useState(false);
    const [stopwatchReset, setStopWatchReset] = useState(false);
    const [showStopWatch, setShowStopWatch] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const getFormattedTime = time => {
        let currentTime = time;
        setTime(currentTime);
    };
    const toggleStopWatch = () => {
        setStopWatchStart(!stopwatchStart);
        setShowStopWatch(true);
        setStopWatchReset(false);
    };
    const stopStopWatch = () => {
        setStopWatchStart(false);
        setStopWatchReset(false);
        setShowReset(true);
    };
    const resetStopWatch = () => {
        setStopWatchStart(false);
        setStopWatchReset(true);
        setShowStopWatch(false);
        setShowReset(false);
        setTime(0);
    };

    const resetInput = () => {
        setWeight(0);
        setCount(0);
        setShowReset(false);
        setStopWatchReset(true);
        setShowStopWatch(false);
        setTime(0);
    }

    const addLog = (weight, count, time) => {
        console.log('Time ', time);
        let timestamp = getTimestamp();
        console.log('Timestamp ', timestamp);
        let id = '5dfecbdd39d8760019968d04';
        let exerciseLog = {
            'userId': id,
            'category': props.category,
            'name': props.name,
            'date': timestamp,
            'weight': weight,
            'count': count,
            'time': time
        };
        resetInput();
        //dispatch(addExerciseLog(exerciseLog, props.logs, props.workouts));
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={BackImg} style={styles.image}>
                <View style={styles.bg}>
                    <View style={{ flexDirection: 'row', paddingBottom: 15, justifyContent: 'center' }}>
                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <Text style={styles.label}>Count</Text>
                            <NumericInput
                                initValue={count}
                                value={count}
                                onChange={value => setCount(value)}
                                type='up-down'
                                totalHeight={60}
                                borderColor='darkgrey'
                                upDownButtonsBackgroundColor='darkgrey' />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <Text style={styles.label}>Weight</Text>
                            <NumericInput
                                initValue={weight}
                                value={weight}
                                onChange={value => setWeight(value)}
                                type='up-down'
                                totalHeight={60}
                                borderColor='darkgrey'
                                upDownButtonsBackgroundColor='darkgrey' />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'center' }}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => stopwatchStart ? stopStopWatch() : toggleStopWatch()} >
                            <Text style={styles.buttonText}>{stopwatchStart ? 'Stop' : showReset ? 'Resume' : 'Start'}</Text>
                            <MaterialIcons name="timer" size={24} color="bisque" />
                            {showStopWatch && <Stopwatch laps start={stopwatchStart}
                                reset={stopwatchReset}
                                options={options}
                                getTime={getFormattedTime} />}
                        </TouchableOpacity>
                        {showReset &&
                            <TouchableOpacity style={{ ...styles.button, marginLeft: 15 }} onPress={() => resetStopWatch()}>
                                <Text style={styles.buttonText}>Reset</Text>
                            </TouchableOpacity>}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 15, marginTop: 25 }}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => addLog(weight, count, time)}>
                            <Text style={{ fontWeight: 'bold' }}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export const screenOptions = navigationData => {
    return {
        headerTitle: navigationData.route.params.workout
    }
};

const options = {
    container: {
        backgroundColor: '#343a40',
        borderRadius: 5
    },
    text: {
        fontSize: 25,
        color: 'bisque',
        marginLeft: 7,
    }
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    button: {
        backgroundColor: '#343a40',
        paddingVertical: 15,
        paddingHorizontal: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },
    addButton: {
        backgroundColor: 'darkgrey',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'bisque',
        paddingHorizontal: 15
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    image: { flex: 1 },
    bg: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        paddingBottom: 20
    },
    innerContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10
    }
});

export default HomeWorkoutlogScreen;