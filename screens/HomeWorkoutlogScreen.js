import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import BackImg from '../assets/back-workout.jpg';
import NumericInput from 'react-native-numeric-input';
import { MaterialIcons } from '@expo/vector-icons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { getTimestamp } from '../utils/getTimeStamp';
import { fetchHomeWorkoutLog, addHomeExerciseLog } from '../store/actions/actions';
import { SimpleLineIcons, Octicons, FontAwesome } from '@expo/vector-icons';

const HomeWorkoutlogScreen = props => {
    const category = 'Homeworkout';
    const userId = '5dfecbdd39d8760019968d04';
    const selectedExercise = props.route.params ? props.route.params.exercise : null;
    const logs = useSelector(state => state.fitlogReducer.homeworkoutlogs);
    console.log('Homeworkout logs ', logs);
    const [count, setCount] = useState(0);
    const [weight, setWeight] = useState(0);
    const [time, setTime] = useState(0);
    const [stopwatchStart, setStopWatchStart] = useState(false);
    const [stopwatchReset, setStopWatchReset] = useState(false);
    const [showStopWatch, setShowStopWatch] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchHomeWorkoutLog(category, selectedExercise, userId));
    }, []);

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
            'category': 'homeworkout',
            'name': selectedExercise,
            'date': timestamp,
            'weight': weight,
            'count': count,
            'time': time
        };
        resetInput();
        dispatch(addHomeExerciseLog(exerciseLog, logs));
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
                            onPress={() => (weight > 0 || count > 0 || time != 0) && addLog(weight, count, time)}>
                            <Text style={{ fontWeight: 'bold' }}>ADD</Text>
                        </TouchableOpacity>
                    </View>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View>
                            <FlatList
                                data={logs}
                                renderItem={({ item }) =>
                                    <View style={styles.logs}>
                                        {item.note ? <View style={{ flex: 1 }}><Octicons name="note" size={24} color="black" onPress={() => addNotes(item)} /></View> :
                                            <View style={{ flex: 1 }}><SimpleLineIcons name="note" size={24} color="black" onPress={() => addNotes(item)} /></View>}
                                        <View style={{ flex: 1 }}>
                                            {/* {bestSet && item.weight === bestSet.weight && item.count === bestSet.count && item.date === moment(bestSet.date).utc().format('MM/DD/YY HH:mm') ?
                                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                <FontAwesome name="trophy" size={25} color={Colors.buttonColor} />
                                            </View> : null} */}
                                        </View>
                                        <View style={{ flex: 3 }}><Text>{item.date}</Text></View>
                                        <View style={{ flex: 1.5 }}><Text style={{ textAlign: 'right' }}>{item.count} reps</Text></View>
                                        <View style={{ flex: 1.5 }}><Text style={{ textAlign: 'right' }}>{item.time !=0 && item.time}</Text></View>
                                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{item.weight ? `${item.weight} ${item.unit}` : ''}</Text></View>
                                    </View>}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

export const screenOptions = navigationData => {
    return {
        headerTitle: navigationData.route.params.exercise
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
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    innerContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    logs: {
        paddingVertical: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgrey'
    },
});

export default HomeWorkoutlogScreen;