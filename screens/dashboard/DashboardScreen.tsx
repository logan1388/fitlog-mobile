import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, SafeAreaView, ScrollView } from 'react-native';
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
import DonutGraph from '../../components/graphs/donut-graph';

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
  const dispatch = useDispatch();
  const userId = '5dfecbdd39d8760019968d04';
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;

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
  const workoutsHistGraphData: WorkoutHistoryGraphModel[] = Object.entries(workoutTypes).map(([k, v]) => ({
    type: k,
    frequency: v,
  }));

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView style={[styles.container, themeContainerStyle]}>
        <View style={styles.innerContainer}>
          {workoutsSummary && workoutsSummary.length > 0 && <Summary workoutsSummary={workoutsSummary} />}
          <View style={{ width: '100%' }}>
            {workoutsHistGraphData && workoutsHistGraphData.length > 0 && (
              <View style={{ marginTop: 15, alignItems: 'center' }}>
                <DonutGraph graphData={workoutsHistGraphData} />
              </View>
            )}
            {workoutsHistory && <History workoutsHistory={workoutsHistory} />}
            <Highlights awards={awardsSumm} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: 'FITBOOK',
};

export default DashboardScreen;
