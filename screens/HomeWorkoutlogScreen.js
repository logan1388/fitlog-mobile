import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import BackImg from '../assets/back-workout.jpg';
import NumericInput from 'react-native-numeric-input';
import { MaterialIcons } from '@expo/vector-icons';
import { Stopwatch } from 'react-native-stopwatch-timer'

const HomeWorkoutlogScreen = props => {
    const [count, setCount] = useState(0);
    const [weight, setWeight] = useState(0);
    const [stopwatchStart, setStopWatchStart] = useState(false);
    const [stopwatchStop, setStopWatchStop] = useState(true);
    const [stopwatchReset, setStopWatchReset] = useState(false);
    const [showStopWatch, setShowStopWatch] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const getFormattedTime = time => {
        currentTime = time;
        console.log(currentTime);
    };
    const toggleStopWatch = () => {
        setStopWatchStart(!stopwatchStart);
        setShowStopWatch(true);
        setStopWatchStop(false);
        setStopWatchReset(false);
    }
    const stopStopWatch = () => {
        setStopWatchStart(false);
        setStopWatchStop(false);
        setStopWatchReset(false);
        setShowReset(true);
    }
    const resetStopWatch = () => {
        setStopWatchStart(false);
        setStopWatchReset(true);
        setShowStopWatch(false);
        setStopWatchStop(true);
        setShowReset(false);
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
                            onPress={() => !stopwatchStart && stopwatchStop ? toggleStopWatch() : !showReset ? stopStopWatch() : resetStopWatch()} >
                            <Text style={styles.buttonText}>{!stopwatchStart && stopwatchStop ? 'Start' : !showReset ? 'Stop' : 'Reset'}</Text>
                            <MaterialIcons name="timer" size={24} color="bisque" />
                            {showStopWatch && <Stopwatch laps start={stopwatchStart}
                                reset={stopwatchReset}
                                options={options}
                                getTime={getFormattedTime} />}
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 15, marginTop: 25 }}>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => weight > 0 && count > 0 && addLog(weight, unit, count)}>
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
    image: {
        flex: 1
    },
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