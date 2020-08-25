import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, ImageBackground, Modal } from 'react-native';
import { expandExercise } from '../store/actions/actions';
import WorkoutInput from '../components/WorkoutInput';
import BackImg from '../assets/back-workout.jpg';
import { saveNote } from '../store/actions/actions';
import Notes from '../components/Notes';
import BestLog from '../components/BestLog';
import Logs from '../components/Logs';

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
                <Logs logs={logs} bestSet={bestSet} addNotes={note => addNotes(note)}/>
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
    lightContainer: { backgroundColor: 'white' },
    darkContainer: { backgroundColor: '#2D2D2D' },
});

export default ExerciseScreen;