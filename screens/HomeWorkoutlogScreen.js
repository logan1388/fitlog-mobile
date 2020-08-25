import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, SafeAreaView, FlatList, ImageBackground, Modal } from 'react-native';
import BackImg from '../assets/back-workout.jpg';
import { fetchHomeWorkoutLog } from '../store/actions/actions';
import { SimpleLineIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import ResistanceInput from '../components/ResistanceInput';
import { saveNote } from '../store/actions/actions';
import Notes from '../components/Notes';
import BestLog from '../components/BestLog';

const HomeWorkoutlogScreen = props => {
    const category = 'Homeworkout';
    const userId = '5dfecbdd39d8760019968d04';
    const mode = useSelector(state => state.fitlogReducer.theme);
    const selectedExercise = props.route.params ? props.route.params.exercise : null;
    const logs = useSelector(state => state.fitlogReducer.homeworkoutlogs);
    const maxRps = useSelector(state => state.fitlogReducer.maxRepsResistance);
    const maxTime = useSelector(state => state.fitlogReducer.maxTime);
    const dispatch = useDispatch();

    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState('');
    const [noteLog, setNoteLog] = useState({});

    const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;

    useEffect(() => {
        dispatch(fetchHomeWorkoutLog(category, selectedExercise, userId));
    }, []);

    const addNotes = log => {
        setNotes(log.note);
        setNoteLog(log);
        setModalVisible(true);
    }

    const saveNotes = () => {
        dispatch(saveNote(noteLog._id, 'home', notes));
        logs.map(log => log._id === noteLog._id && (log.note = notes));
        setNotes('');
        setModalVisible(!modalVisible);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <ImageBackground source={BackImg} style={{ flex: 1 }}> */}
            <View style={[styles.bg, themeContainerStyle]}>
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
                <ResistanceInput category={category} name={selectedExercise} logs={logs} />
                <BestLog maxRps={maxRps} maxTime={maxTime}/>
                <SafeAreaView style={{ flex: 1 }}>
                    <View>
                        <FlatList
                            data={logs}
                            renderItem={({ item }) =>
                                <View style={styles.logs}>
                                    {item.note ? <View style={{ flex: 1 }}><Octicons name="note" size={24} color={mode === 'light' ? 'black' : 'darkgrey'} onPress={() => addNotes(item)} /></View> :
                                        <View style={{ flex: 1 }}><SimpleLineIcons name="note" size={24} color={mode === 'light' ? 'black' : 'darkgrey'} onPress={() => addNotes(item)} /></View>}
                                    <View style={{ flex: 3 }}><Text style={themeTextStyle}>{item.date}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.count ? `${item.count} reps` : '-'}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.time != 0 ? item.time : '-'}</Text></View>
                                    <View style={{ flex: 1.5 }}><Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.weight ? `${item.weight} lbs` : '-'}</Text></View>
                                </View>}
                            keyExtractor={item => item._id}
                        />
                    </View>
                </SafeAreaView>
            </View>
            {/* </ImageBackground> */}
        </SafeAreaView>
    );
}

export const screenOptions = navigationData => {
    return {
        headerTitle: navigationData.route.params.exercise
    }
};

const styles = StyleSheet.create({
    bg: {
        backgroundColor: 'rgba(238, 238, 238, 0.8)',
        height: '100%',
        paddingVertical: 20,
        paddingHorizontal: 20,
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
    darkThemeText: { color: 'bisque' }
});

export default HomeWorkoutlogScreen;