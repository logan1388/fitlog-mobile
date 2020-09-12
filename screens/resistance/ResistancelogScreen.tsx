import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, Modal, Alert, TouchableOpacity } from 'react-native';
import { fetchResistanceList } from '../../store/resistance';
import ResistanceInput from '../../components/ResistanceInput';
import { maxReps, maxTime, saveNote } from '../../store/actions/actions';
import Notes from '../../components/Notes';
import BestLog from '../../components/BestLog';
import Logs from '../../components/Logs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { resistanceStyles } from './ResistanceScreen.style';
import { ResistanceStackRouteParams, ResistanceStackScreens } from '../../navigation/Navigator';
import { RootState } from '../../store/actionHelpers';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ResistanceModel } from '../../commonlib/models/ResistanceModel';

interface ResistanceReduxState {
  resistances?: ResistanceModel[];
}

const ResistancelogScreen = () => {
  const category = 'Resistance';
  const userId = '5dfecbdd39d8760019968d04';
  const route = useRoute<RouteProp<ResistanceStackRouteParams, ResistanceStackScreens.ResistancelogScreen>>();
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const selectedExercise = route.params && route.params.exercise;
  const maxRps = useSelector<RootState>(state => state.fitlogReducer.maxRepsResistance);
  const maximumTime = useSelector<RootState>(state => state.fitlogReducer.maxTime);
  const dispatch = useDispatch();
  const [styles, setStyles] = useState(resistanceStyles());
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [logInputModalVisible, setLogInputModalVisible] = useState(false);
  const [notes, setNotes] = useState('');
  const [noteLog, setNoteLog] = useState<ResistanceModel>();
  const themeContainerStyle =
    mode === 'light'
      ? notesModalVisible || logInputModalVisible
        ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        : styles.lightContainer
      : notesModalVisible || logInputModalVisible
      ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
      : styles.darkContainer;
  const themeButtonStyle = mode === 'light' ? '#343a40' : 'bisque';

  const resistanceReduxState = useSelector<RootState, ResistanceReduxState>(state => {
    const resistances = state.resistance.resistances;
    return { resistances };
  });

  const { resistances } = resistanceReduxState;

  useEffect(() => {
    setStyles(resistanceStyles());
    dispatch(fetchResistanceList(category, selectedExercise, userId));
    dispatch(maxReps(userId, selectedExercise));
    dispatch(maxTime(userId, selectedExercise));
  }, [setStyles, dispatch, selectedExercise]);

  const addNotes = (log: ResistanceModel) => {
    setNotes(log.note);
    setNoteLog(log);
    setNotesModalVisible(true);
  };

  const saveNotes = () => {
    dispatch(saveNote(noteLog && noteLog.id, 'home', notes));
    resistances && resistances.map((log: ResistanceModel) => log.id === (noteLog && noteLog.id) && (log.note = notes));
    setNotes('');
    setNotesModalVisible(!notesModalVisible);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.logsBg, themeContainerStyle]}>
        <Modal
          animationType="none"
          transparent={true}
          visible={notesModalVisible}
          onRequestClose={() => Alert.alert('Modal has been closed.')}>
          <Notes
            notes={notes}
            setNotes={(text: string) => setNotes(text)}
            saveNotes={saveNotes}
            modalVisible={notesModalVisible}
            setModalVisible={(value: boolean) => setNotesModalVisible(value)}
          />
        </Modal>
        <Modal
          animationType="none"
          transparent={true}
          visible={logInputModalVisible}
          onRequestClose={() => Alert.alert('Modal has been closed.')}>
          <ResistanceInput
            category={category}
            name={selectedExercise}
            modalVisible={logInputModalVisible}
            setModalVisible={(value: boolean) => setLogInputModalVisible(value)}
          />
        </Modal>
        <BestLog maxRps={maxRps} maxTime={maximumTime} />
        {resistances && (
          <Logs
            resistance={true}
            logs={resistances}
            exercise={selectedExercise}
            addNotes={(note: ResistanceModel) => addNotes(note)}
          />
        )}
        <TouchableOpacity style={styles.floatingButton} onPress={() => setLogInputModalVisible(true)}>
          <Icon name="plus-circle" size={50} color={themeButtonStyle} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export const screenOptions = (navigationData: any) => {
  return {
    headerTitle: navigationData.route.params.exercise,
  };
};

export default ResistancelogScreen;