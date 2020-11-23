import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, ScrollView, Modal } from 'react-native';
import { weeklyAwards } from '../../store/actions/actions';
import { dashboardStyles } from './DashboardScreen.style';
import { RootState } from '../../store/actionHelpers';
import History from '../../components/History';
import Summary from '../../components/Summary';
import Highlights from '../../components/Highlights';
import {
  WorkoutSummaryModel,
  WorkoutHistoryModel,
  WorkoutTypes,
  WorkoutHistoryGraphModel,
} from '../../commonlib/models/WorkoutModel';
import { fetchWorkoutsSummary, fetchWorkoutsHistory } from '../../store/workouts';
import DonutGraphWebView from '../../components/graphs/DonutGraphWebView';
import FloatingButtons from '../../components/FloatingButtons';
import CreateWorkout from '../../components/CreateWorkout';
import CreateResistance from '../../components/CreateResistance';

interface WorkoutsSummaryReduxState {
  workoutsSummary?: WorkoutSummaryModel[];
}

interface WorkoutsHistoryReduxState {
  workoutsHistory?: WorkoutHistoryModel[];
}

const DashboardScreen = () => {
  const awardsSumm = useSelector<RootState>(state => state.fitlogReducer.awardsWeek);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(dashboardStyles());
  const [floatBtn, setFloatBtn] = useState(false);
  const [workoutInputModalVisible, setWorkoutInputModalVisible] = useState(false);
  const [resistanceInputModalVisible, setResistanceInputModalVisible] = useState(false);
  const dispatch = useDispatch();
  const userId = '5dfecbdd39d8760019968d04';
  const themeContainerStyle =
    mode === 'light'
      ? floatBtn || workoutInputModalVisible || resistanceInputModalVisible
        ? { opacity: 0.2 }
        : styles.lightContainer
      : floatBtn || workoutInputModalVisible || resistanceInputModalVisible
      ? { opacity: 0.2, backgroundColor: 'black' }
      : styles.darkContainer;

  const workoutsSummaryReduxState = useSelector<RootState, WorkoutsSummaryReduxState>(state => {
    let workoutsSumm = state.workouts.workoutsSummary;
    let workoutsSummary = workoutsSumm.slice().sort((a: any, b: any) => new Date(b.date) - new Date(a.date));
    return { workoutsSummary };
  });
  let { workoutsSummary } = workoutsSummaryReduxState;

  const workoutsHistoryReduxState = useSelector<RootState, WorkoutsHistoryReduxState>(state => {
    const workoutsHistory = state.workouts.workoutsHistory;
    return { workoutsHistory };
  });
  const { workoutsHistory } = workoutsHistoryReduxState;

  React.useEffect(() => {
    dispatch(fetchWorkoutsHistory(userId));
    dispatch(fetchWorkoutsSummary(userId));
    dispatch(weeklyAwards(userId));
    setStyles(dashboardStyles());
  }, [dispatch, setStyles]);

  const workoutTypes: WorkoutTypes =
    workoutsHistory &&
    workoutsHistory.map(w => w.type).reduce((acc: any, w: any) => ((acc[w] = (acc[w] || 0) + 1), acc), {});
  const donutgraphdata: WorkoutHistoryGraphModel[] = Object.entries(workoutTypes).map(([k, v]) => ({
    type: k,
    frequency: v,
  }));
  donutgraphdata.sort((a, b) => b.frequency - a.frequency);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView style={[styles.container, themeContainerStyle]}>
        <View style={styles.innerContainer}>
          {workoutsSummary && workoutsSummary.length > 0 && <Summary workoutsSummary={workoutsSummary} />}
          <View style={{ width: '100%' }}>
            {donutgraphdata && donutgraphdata.length > 0 && (
              <View style={{ marginTop: 15, alignItems: 'center' }}>
                <DonutGraphWebView donutgraphdata={donutgraphdata} />
              </View>
            )}
            {workoutsHistory && <History workoutsHistory={workoutsHistory} />}
            <Highlights awards={awardsSumm} />
          </View>
        </View>
        <Modal
          animationType="none"
          transparent={true}
          visible={workoutInputModalVisible || resistanceInputModalVisible}>
          {workoutInputModalVisible && (
            <CreateWorkout
              modalVisible={workoutInputModalVisible}
              setModalVisible={(value: boolean) => setWorkoutInputModalVisible(value)}
            />
          )}
          {resistanceInputModalVisible && (
            <CreateResistance
              modalVisible={resistanceInputModalVisible}
              setModalVisible={(value: boolean) => setResistanceInputModalVisible(value)}
            />
          )}
        </Modal>
      </ScrollView>
      <FloatingButtons
        floatBtn={floatBtn}
        setFloatBtn={setFloatBtn}
        workoutInputModalVisible={workoutInputModalVisible}
        setWorkoutInputModalVisible={setWorkoutInputModalVisible}
        resistanceInputModalVisible={resistanceInputModalVisible}
        setResistanceInputModalVisible={setResistanceInputModalVisible}
      />
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: 'FITBOOK',
};

export default DashboardScreen;
