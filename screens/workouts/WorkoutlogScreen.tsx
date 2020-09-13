import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Modal, Alert, TouchableOpacity } from 'react-native';
import CreateWorkout from '../../components/CreateWorkout';
import { saveNote } from '../../store/actions/actions';
import Notes from '../../components/Notes';
import BestLog from '../../components/BestLog';
import Logs from '../../components/Logs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { workoutStyles } from './WorkoutScreen.style';
import { WorkoutStackRouteParams, WorkoutStackScreens } from '../../navigation/NavigatorTypes';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootState } from '../../store/actionHelpers';
import { WorkoutModel, getWorkoutType } from '../../commonlib/models/WorkoutModel';
import { fetchWorkoutsList } from '../../store/workouts';

interface WorkoutsReduxState {
  workouts?: WorkoutModel[];
}

const WorkoutlogScreen = () => {
  const route = useRoute<RouteProp<WorkoutStackRouteParams, WorkoutStackScreens.WorkoutlogScreen>>();
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const logs = useSelector<RootState>(state => state.fitlogReducer.logs);
  const maxWt = useSelector<RootState>(state => state.fitlogReducer.maxWeight);
  const maxRps = useSelector<RootState>(state => state.fitlogReducer.maxReps);
  const bestSet = useSelector<RootState>(state => state.fitlogReducer.bestSet);
  const type = route.params ? route.params.type : 'Chest';
  const subType = route.params ? route.params.subType : 'Bench Press';
  const selectedExercise = {
    type,
    subType,
  };
  console.log('WorkoutlogScreen ', route.params);
  const userId = '5dfecbdd39d8760019968d04';
  const dispatch = useDispatch();
  const [notesModalVisible, setNotesModalVisible] = useState(false);
  const [logInputModalVisible, setLogInputModalVisible] = useState(false);
  const [notes, setNotes] = useState('');
  const [noteLog, setNoteLog] = useState<WorkoutModel>();
  const [styles, setStyles] = useState(workoutStyles());
  const themeContainerStyle =
    mode === 'light'
      ? notesModalVisible || logInputModalVisible
        ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        : styles.lightContainer
      : notesModalVisible || logInputModalVisible
        ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        : styles.darkContainer;
  const themeButtonStyle = mode === 'light' ? '#343a40' : 'bisque';

  const workoutsReduxState = useSelector<RootState, WorkoutsReduxState>(state => {
    const workouts = state.workouts.workouts;
    return { workouts };
  });

  const { workouts } = workoutsReduxState;

  useEffect(() => {
    setStyles(workoutStyles());
    dispatch(fetchWorkoutsList(type, selectedExercise, userId));
  }, [setStyles]);

  const addNotes = (log: WorkoutModel) => {
    setNotes(log.note);
    setNoteLog(log);
    setNotesModalVisible(true);
  };

  const saveNotes = () => {
    dispatch(saveNote(noteLog && noteLog._id, noteLog && noteLog.type, notes));
    workouts && workouts.map(log => log._id === (noteLog && noteLog._id) && (log.note = notes));
    setNotes('');
    setNotesModalVisible(!notesModalVisible);
  };

  return (
    <View style={[styles.outerContainer, themeContainerStyle]}>
      <Modal
        animationType="none"
        transparent={true}
        visible={notesModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <Notes
          notes={notes}
          setNotes={(text: string) => setNotes(text)}
          saveNotes={saveNotes}
          modalVisible={notesModalVisible}
          setModalVisible={(value: boolean) => setNotesModalVisible(value)}
        />
      </Modal>
      <View style={[styles.workoutlogContainer, themeContainerStyle]}>
        <Modal
          animationType="none"
          transparent={true}
          visible={logInputModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <CreateWorkout
            type={getWorkoutType(type)}
            subType={subType}
            modalVisible={logInputModalVisible}
            setModalVisible={(value: boolean) => setLogInputModalVisible(value)}
          />
        </Modal>
        <BestLog bestSet={bestSet} maxWt={maxWt} maxRps={maxRps} />
        <Logs logs={workouts} exercise={subType} bestSet={bestSet} addNotes={(note: WorkoutModel) => addNotes(note)} />
        <TouchableOpacity style={styles.floatingButton} onPress={() => setLogInputModalVisible(true)}>
          <Icon name="plus-circle" size={50} color={themeButtonStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const screenOptions = (navigationData: any) => {
  return {
    headerTitle: navigationData.route.params.subType.toUpperCase(),
  };
};

export default WorkoutlogScreen;
