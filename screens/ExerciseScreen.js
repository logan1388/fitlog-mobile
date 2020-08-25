import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, FlatList, Modal } from 'react-native';
import { expandExercise } from '../store/actions/actions';
import WorkoutInput from '../components/WorkoutInput';
import BackImg from '../assets/back-workout.jpg';
import { SimpleLineIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/colors';
import moment from 'moment';
import { saveNote } from '../store/actions/actions';
import Notes from '../components/Notes';
import BestLog from '../components/BestLog';

const ExerciseScreen = props => {
    const selectedExercise = props.route.params ? props.route.params.exercise : null;
    const mode = useSelector(state => state.fitlogReducer.theme);
    const logs = useSelector(state => state.fitlogReducer.logs);
    const workouts = useSelector(state => state.fitlogReducer.workouts);
    const maxWt = useSelector(state => state.fitlogReducer.maxWeight);
    const maxRps = useSelector(state => state.fitlogReducer.maxReps);
    const bestSet = useSelector(state => state.fitlogReducer.bestSet);
    const user = useSelector(state => state.fitlogReducer.user);
    const category = props.route.params ? props.route.params.workout : null;
    const userId = '5dfecbdd39d8760019968d04';
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState('');
    const [noteLog, setNoteLog] = useState({});

    const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;

    useEffect(() => {
        dispatch(expandExercise(workouts, category, selectedExercise, userId));
    }, []);

    const addNotes = log => {
        setNotes(log.note);
        setNoteLog(log);
        setModalVisible(true);
    }

    const saveNotes = () => {
        dispatch(saveNote(noteLog._id, noteLog.category, notes));
        logs.map(log => log._id === noteLog._id && (log.note = notes));
        setNotes('');
        setModalVisible(!modalVisible);
    }

    return (
        <View style={[styles.container, themeContainerStyle]}>
            {/* <ImageBackground source={BackImg} style={{ flex: 1 }}> */}
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { Alert.alert("Modal has been closed.") }}>
                <Notes
                    notes={notes}
                    setNotes={text => setNotes(text)}
                    saveNotes={saveNotes}
                    modalVisible={modalVisible}
                    setModalVisible={modalVisible => setModalVisible(modalVisible)} />
            </Modal>
            <View style={[styles.innerContainer, themeContainerStyle]}>
                <WorkoutInput category={category} name={selectedExercise} logs={logs} workouts={workouts} />
                <BestLog bestSet={bestSet} maxWt={maxWt} maxRps={maxRps}/>
                <SafeAreaView style={{ flex: 1 }}>
                    <View>
                        <FlatList
                            data={logs}
                            renderItem={({ item }) =>
                                <View style={styles.logs}>
                                    {item.note ? <View style={{ flex: 1 }}><Octicons name="note" size={24} color={mode === 'light' ? 'black' : 'darkgrey'} onPress={() => addNotes(item)} /></View> :
                                        <View style={{ flex: 1 }}><SimpleLineIcons name="note" size={24} color={mode === 'light' ? 'black' : 'darkgrey'} onPress={() => addNotes(item)} /></View>}
                                    <View style={{ flex: 1 }}>
                                        {bestSet && item.weight === bestSet.weight && item.count === bestSet.count && item.date === moment(bestSet.date).utc().local().format('MM/DD/YY HH:mm') ?
                                            <View style={{ flexDirection: 'row' }}>
                                                <FontAwesome name="trophy" size={25} color={mode === 'light' ? Colors.buttonColor : 'bisque'} />
                                            </View> : null}
                                    </View>
                                    <View style={{ flex: 2.5 }}><Text style={themeTextStyle}>{item.date}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.weight} {item.unit}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.count} reps</Text></View>
                                </View>}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </SafeAreaView>
            </View>
            {/* </ImageBackground> */}
        </View>
    );
}

export const screenOptions = navigationData => {
    return {
        headerTitle: navigationData.route.params.params.exercise
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
    logs: {
        paddingVertical: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgrey'
    },
    lightContainer: { backgroundColor: 'white' },
    darkContainer: { backgroundColor: '#2D2D2D' },
    lightThemeText: { color: 'black' },
    darkThemeText: { color: 'bisque'}
});

export default ExerciseScreen;