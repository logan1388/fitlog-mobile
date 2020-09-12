import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Modal, Alert, TouchableOpacity, Text } from 'react-native';
import { expandExercise } from '../store/actions/actions';
import WorkoutInput from '../components/WorkoutInput';
import { saveNote } from '../store/actions/actions';
import Notes from '../components/Notes';
import BestLog from '../components/BestLog';
import Logs from '../components/Logs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ExerciseScreen = props => {
  const selectedExercise = props.route.params ? props.route.params.exercise : null;
  const mode = useSelector(state => state.fitlogReducer.theme);
  const logs = useSelector(state => state.fitlogReducer.logs);
  const workouts = useSelector(state => state.fitlogReducer.workouts);
  const maxWt = useSelector(state => state.fitlogReducer.maxWeight);
  const maxRps = useSelector(state => state.fitlogReducer.maxReps);
  const bestSet = useSelector(state => state.fitlogReducer.bestSet);
  const category = props.route.params ? props.route.params.workout : null;
  const userId = '5dfecbdd39d8760019968d04';
  const dispatch = useDispatch();
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [logInputModalVisible, setLogInputModalVisible] = useState(false);
  const [notes, setNotes] = useState('');
  const [noteLog, setNoteLog] = useState({});
  const themeContainerStyle =
    mode === 'light'
      ? notesModalVisible || logInputModalVisible
        ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        : styles.lightContainer
      : notesModalVisible || logInputModalVisible
      ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
      : styles.darkContainer;
  const themeButtonStyle = mode === 'light' ? '#343a40' : 'bisque';

  useEffect(() => {
    dispatch(expandExercise(workouts, category, selectedExercise, userId));
  }, [category, dispatch, selectedExercise, workouts]);

  const addNotes = log => {
    setNotes(log.note);
    setNoteLog(log);
    setNotesModalVisible(true);
  };

  const saveNotes = () => {
    dispatch(saveNote(noteLog._id, noteLog.category, notes));
    logs.map(log => log._id === noteLog._id && (log.note = notes));
    setNotes('');
    setNotesModalVisible(!notesModalVisible);
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      {/* <ImageBackground source={BackImg} style={{ flex: 1 }}> */}
      <Modal
        animationType="none"
        transparent={true}
        visible={notesModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <Notes
          notes={notes}
          setNotes={text => setNotes(text)}
          saveNotes={saveNotes}
          modalVisible={notesModalVisible}
          setModalVisible={notesModalVisible => setNotesModalVisible(notesModalVisible)}
        />
      </Modal>
      <View style={[styles.innerContainer, themeContainerStyle]}>
        <Modal
          animationType="none"
          transparent={true}
          visible={logInputModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <WorkoutInput
            category={category}
            name={selectedExercise}
            logs={logs}
            workouts={workouts}
            modalVisible={logInputModalVisible}
            setModalVisible={logInputModalVisible => setLogInputModalVisible(logInputModalVisible)}
          />
        </Modal>
        <BestLog bestSet={bestSet} maxWt={maxWt} maxRps={maxRps} />
        <Logs logs={logs} exercise={selectedExercise} bestSet={bestSet} addNotes={note => addNotes(note)} />
        <TouchableOpacity style={styles.floatingButton} onPress={() => setLogInputModalVisible(true)}>
          <Icon name="plus-circle" size={50} color={themeButtonStyle} />
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

export const screenOptions = navigationData => {
  return {
    headerTitle: navigationData.route.params.params.exercise,
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
    height: '100%',
  },
  lightContainer: { backgroundColor: 'white' },
  darkContainer: { backgroundColor: '#2D2D2D' },
  floatingButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 15,
    bottom: 45,
  },
});

export default ExerciseScreen;
