import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    StyleSheet, Text, View, ImageBackground, SafeAreaView, FlatList, Modal,
    TouchableHighlight, TextInput, TouchableWithoutFeedback, TouchableOpacity, Keyboard
} from 'react-native';
import { expandExercise, maxWeight } from '../store/actions/actions';
import WorkoutInput from '../components/WorkoutInput';
import BackImg from '../assets/back-workout.jpg';
import { SimpleLineIcons, Octicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../constants/colors';
import moment from 'moment';

const ExerciseScreen = props => {
    const selectedExercise = props.route.params ? props.route.params.exercise : null;
    const logs = useSelector(state => state.fitlogReducer.logs);
    const workouts = useSelector(state => state.fitlogReducer.workouts);
    const maxWt = useSelector(state => state.fitlogReducer.maxWeight);
    const user = useSelector(state => state.fitlogReducer.user);
    const category = props.route.params ? props.route.params.workout : null;
    const userId = '5dfecbdd39d8760019968d04';
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [notes, setNotes] = useState('');

    useEffect(() => {
        dispatch(expandExercise(workouts, category, selectedExercise, userId));
        dispatch(maxWeight(userId, category, selectedExercise));
    }, []);

    const addNotes = log => {
        console.log(log);
        console.log(maxWt);
        setModalVisible(true);
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
                    {/* <TouchableOpacity
                        style={styles.centeredView}
                        activeOpacity={1}
                        onPressOut={() => {
                            setNotes('');
                            setModalVisible(!modalVisible);
                        }}
                    > */}
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
                                    <TouchableHighlight
                                        style={{ ...styles.openButton, backgroundColor: "lightgrey" }}
                                        onPress={() => {
                                            setNotes('');
                                            setModalVisible(!modalVisible);
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Hide Modal</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    {/* </TouchableOpacity> */}
                </Modal>
                <View style={styles.innerContainer}>
                    <WorkoutInput category={category} name={selectedExercise} logs={logs} workouts={workouts} />
                    {maxWt && <Text style={styles.maxwt}>
                        <Text style={styles.maxwtText}>Max Weight: </Text>
                        <Text>{maxWt.weight} </Text>
                        <Text>{maxWt.unit} </Text>
                        <Text style={styles.maxwtText}>Count: </Text>
                        <Text>{maxWt.count}</Text>
                    </Text>}
                    <SafeAreaView style={{ flex: 1 }}>
                        <View>
                            <FlatList
                                data={logs}
                                renderItem={({ item }) =>
                                    <View style={styles.logs}>
                                        <View style={{ flex: 1 }}><SimpleLineIcons name="note" size={24} color="black" onPress={() => addNotes(item)} /></View>
                                        <View style={{ flex: 1 }}>
                                            {item.weight === maxWt.weight && item.count === maxWt.count && item.date === moment(maxWt.date).utc().format('MM/DD/YY HH:mm') ? 
                                            <FontAwesome name="trophy" size={25} color={Colors.buttonColor} /> : null}
                                        </View>
                                        <View style={{ flex: 2 }}><Text>{item.date}</Text></View>
                                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{item.weight} {item.unit}</Text></View>
                                        <View style={{ flex: 1 }}><Text style={{ textAlign: 'right' }}>{item.count} reps</Text></View>
                                    </View>}
                                keyExtractor={item => item.date}
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
        height: 40,
        textAlign: 'center'
    },
    maxwtText: { fontWeight: 'bold' },
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
        borderRadius: 20,
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