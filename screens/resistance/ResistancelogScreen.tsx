import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, Modal, Alert, Text, TouchableOpacity } from 'react-native';
import { fetchResistanceLog } from '../../store/actions/actions';
import ResistanceInput from '../../components/ResistanceInput';
import { saveNote } from '../../store/actions/actions';
import Notes from '../../components/Notes';
import BestLog from '../../components/BestLog';
import Logs from '../../components/Logs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { resistanceStyles } from './ResistanceScreen.style';
import { StackNavigationProp } from '@react-navigation/stack';
import { ResistanceStackRouteParams, ResistanceStackScreens } from '../../navigation/Navigator';
import { RootState } from '../../store/actionHelpers';
import { useRoute, RouteProp } from '@react-navigation/native'
import { ResistanceModel } from '../../commonlib/models/ResistanceModel';

interface ResistanceReduxState {
  resistance?: ResistanceModel[];
}

type ResistanceNavigationProps = StackNavigationProp<
  ResistanceStackRouteParams,
  ResistanceStackScreens.ResistancelogScreen
>;

interface ResistancelogProps {
  navigation: ResistanceNavigationProps;
}

const ResistancelogScreen: React.FC<ResistancelogProps> = props => {
  const category = 'Resistance';
  const userId = '5dfecbdd39d8760019968d04';
  const route = useRoute<RouteProp<ResistanceStackRouteParams, ResistanceStackScreens.ResistancelogScreen>>();
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const selectedExercise = route.params && route.params.exercise;
  const logs = useSelector<RootState, ResistanceModel>(state => state.fitlogReducer.resistancelogs);
  const maxRps = useSelector<RootState>(state => state.fitlogReducer.maxRepsResistance);
  const maxTime = useSelector<RootState>(state => state.fitlogReducer.maxTime);
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
    const resistance = state.resistance.resistance;
    return { resistance: resistance };
  });

  const { resistance } = resistanceReduxState;

  useEffect(() => {
    setStyles(resistanceStyles());
    dispatch(fetchResistanceLog(category, selectedExercise, userId));
  }, [setStyles, dispatch, selectedExercise]);

  const addNotes = (log: ResistanceModel) => {
    setNotes(log.note);
    setNoteLog(log);
    setNotesModalVisible(true);
  };

  const saveNotes = (noteLog: ResistanceModel) => {
    dispatch(saveNote(noteLog.id, 'home', notes));
    resistance && resistance.map((log: ResistanceModel) => log.id === noteLog.id && (log.note = notes));
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
            setModalVisible={(notesModalVisible: boolean) => setNotesModalVisible(notesModalVisible)}
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
            logs={logs}
            modalVisible={logInputModalVisible}
            setModalVisible={(logInputModalVisible: boolean) => setLogInputModalVisible(logInputModalVisible)}
          />
        </Modal>
        <BestLog maxRps={maxRps} maxTime={maxTime} />
        {resistance && resistance.length ? (
          <Logs resistance={true} logs={resistance} exercise={selectedExercise} addNotes={(note: ResistanceModel) => addNotes(note)} />
        ) : (
            <View style={styles.noDataText}>
              <Text>Start logging!</Text>
            </View>
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
