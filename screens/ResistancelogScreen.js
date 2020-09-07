import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, SafeAreaView, Modal, Alert, Text, TouchableOpacity } from 'react-native';
import { fetchHomeWorkoutLog } from '../store/actions/actions';
import ResistanceInput from '../components/ResistanceInput';
import { saveNote } from '../store/actions/actions';
import Notes from '../components/Notes';
import BestLog from '../components/BestLog';
import Logs from '../components/Logs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ResistancelogScreen = props => {
  const category = 'Homeworkout';
  const userId = '5dfecbdd39d8760019968d04';
  const mode = useSelector(state => state.fitlogReducer.theme);
  const selectedExercise = props.route.params ? props.route.params.exercise : null;
  const logs = useSelector(state => state.fitlogReducer.homeworkoutlogs);
  const maxRps = useSelector(state => state.fitlogReducer.maxRepsResistance);
  const maxTime = useSelector(state => state.fitlogReducer.maxTime);
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
    dispatch(fetchHomeWorkoutLog(category, selectedExercise, userId));
  }, [dispatch, selectedExercise]);

  const addNotes = log => {
    setNotes(log.note);
    setNoteLog(log);
    setNotesModalVisible(true);
  };

  const saveNotes = () => {
    dispatch(saveNote(noteLog._id, 'home', notes));
    logs.map(log => log._id === noteLog._id && (log.note = notes));
    setNotes('');
    setNotesModalVisible(!notesModalVisible);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ImageBackground source={BackImg} style={{ flex: 1 }}> */}
      <View style={[styles.bg, themeContainerStyle]}>
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
        <Modal
          animationType="none"
          transparent={true}
          visible={logInputModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <ResistanceInput
            category={category}
            name={selectedExercise}
            logs={logs}
            modalVisible={logInputModalVisible}
            setModalVisible={logInputModalVisible => setLogInputModalVisible(logInputModalVisible)}
          />
        </Modal>
        <BestLog maxRps={maxRps} maxTime={maxTime} />
        {logs.length ? (
          <Logs resistance={true} logs={logs} addNotes={note => addNotes(note)} />
        ) : (
          <View style={{ alignItems: 'center' }}>
            <Text>Start logging!</Text>
          </View>
        )}
        <TouchableOpacity style={styles.floatingButton} onPress={() => setLogInputModalVisible(true)}>
          <Icon name="plus-circle" size={50} color={themeButtonStyle} />
        </TouchableOpacity>
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export const screenOptions = navigationData => {
  return {
    headerTitle: navigationData.route.params.exercise,
  };
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
    height: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
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

export default ResistancelogScreen;
