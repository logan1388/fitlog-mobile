import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    StyleSheet, Text, View, ImageBackground, SafeAreaView, FlatList, Modal,
    TouchableHighlight, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard
} from 'react-native';
import { expandExercise } from '../store/actions/actions';
import WorkoutInput from '../components/workoutInput';
import BackImg from '../assets/back-workout.jpg';
import { SimpleLineIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/colors';
import moment from 'moment';
import { saveNote } from '../store/actions/actions';

const ExerciseScreen = props => {
    const selectedExercise = props.route.params ? props.route.params.exercise : null;
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
        <View style={styles.container}>
            <ImageBackground source={BackImg} style={styles.image}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TextInput
                                    style={{ borderColor: 'gray', borderWidth: 1, width: '100%', height: 90 }}
                                    placeholder='Notes'
                                    multiline
                                    numberOfLines={4}
                                    maxLength={100}
                                    onChangeText={text => setNotes(text)}
                                    value={notes}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "lightgrey", marginRight: 15 }}
                                        onPress={() => saveNotes()}
                                    >
                                        <Text style={styles.textStyle}>Save</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "lightgrey" }}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.textStyle}>Close</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <View style={styles.innerContainer}>
                    <WorkoutInput category={category} name={selectedExercise} logs={logs} workouts={workouts} />
                    <View style={{ flexDirection: 'row' }}>
                        {bestSet && <View style={styles.maxwt}>
                            <Text style={styles.maxwtText}>Best Set</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text>{bestSet.weight} </Text>
                                <Text>{bestSet.unit} </Text>
                                <Text>{bestSet.count} reps</Text>
                            </View>
                        </View>}
                        {maxWt && <View style={styles.maxwt}>
                            <Text style={styles.maxwtText}>Max Weight</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text>{maxWt.weight} </Text>
                                <Text>{maxWt.unit} </Text>
                                <Text>{maxWt.count} reps</Text>
                            </View>
                        </View>}
                        {maxRps && <View style={styles.maxwt}>
                            <Text style={styles.maxwtText}>Max Reps</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <Text>{maxRps.weight} </Text>
                                <Text>{maxRps.unit} </Text>
                                <Text>{maxRps.count} reps</Text>
                            </View>
                        </View>}
                    </View>
                    <SafeAreaView style={{ flex: 1 }}>
                        <View>
                            <FlatList
                                data={logs}
                                renderItem={({ item }) =>
                                    <View style={styles.logs}>
                                        {item.note ? <View style={{ flex: 1 }}><Octicons name="note" size={24} color="black" onPress={() => addNotes(item)} /></View> :
                                            <View style={{ flex: 1 }}><SimpleLineIcons name="note" size={24} color="black" onPress={() => addNotes(item)} /></View>}
                                        <View style={{ flex: 2 }}>
                                            {bestSet && item.weight === bestSet.weight && item.count === bestSet.count && item.date === moment(bestSet.date).utc().format('MM/DD/YY HH:mm') ?
                                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                                    <FontAwesome name="trophy" size={25} color={Colors.buttonColor} />
                                                </View> : null}
                                        </View>
                                        <View style={{ flex: 2.5 }}><Text>{item.date}</Text></View>
                                        <View style={{ flex: 1.5 }}><Text style={{ textAlign: 'right' }}>{item.weight} {item.unit}</Text></View>
                                        <View style={{ flex: 1.5 }}><Text style={{ textAlign: 'right' }}>{item.count} reps</Text></View>
                                    </View>}
                                keyExtractor={item => item._id}
                            />
                        </View>
                    </SafeAreaView>
                </View>
            </ImageBackground>
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
    image: { flex: 1 },
    overlay: { backgroundColor: 'rgba(255,0,0,0.5)' },
    maxwt: {
        height: 50,
        textAlign: 'center',
        flex: 3
    },
    maxwtText: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    text: {
        margin: 6,
        textAlign: 'center'
    },
    start: {
        flex: 1,
        textAlign: 'center',
        marginTop: 90,
        fontWeight: 'bold'
    },
    logs: {
        paddingVertical: 8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgrey'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        backgroundColor: "white",
        width: 250,
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginTop: 15
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default ExerciseScreen;