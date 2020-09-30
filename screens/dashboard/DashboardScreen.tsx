import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { weeklyAwards } from '../../store/actions/actions';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackScreens, DashboardStackRouteParams } from '../../navigation/NavigatorTypes';
import { dashboardStyles } from './DashboardScreen.style';
import { RootState } from '../../store/actionHelpers';
import History from '../../components/History';
import Summary from '../../components/Summary';
import Highlights from '../../components/Highlights';
import { WorkoutSummaryModel, WorkoutHistoryModel } from '../../commonlib/models/WorkoutModel';
import { fetchWorkoutsSummary, fetchWorkoutsHistory } from '../../store/workouts';
import * as d3 from 'd3';
import { Svg, G, Path, Text as svgText } from 'react-native-svg';

type DashboardNavigationProps = StackNavigationProp<DashboardStackRouteParams, DashboardStackScreens>;

interface DashboardProps {
  navigation: DashboardNavigationProps;
}

interface WorkoutsSummaryReduxState {
  workoutsSummary?: WorkoutSummaryModel[];
}

interface WorkoutsHistoryReduxState {
  workoutsHistory?: WorkoutHistoryModel[];
}

const DashboardScreen: React.FC<DashboardProps> = props => {
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

  const SVGHeight = 250;
  const SVGWidth = 250;
  const workoutTypes: any =
    workoutsHistory &&
    workoutsHistory.map(w => w.type).reduce((acc: any, w: any) => ((acc[w] = (acc[w] || 0) + 1), acc), {});
  const workouts: any = Object.entries(workoutTypes).map(([k, v]) => ({
    type: k,
    frequency: v,
  }));

  const sectionAngles = d3.pie().value((d: any) => d.frequency)(workouts);
  const arcPath = d3.arc().outerRadius(100).innerRadius(60);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView style={[styles.container, themeContainerStyle]}>
        <View style={styles.innerContainer}>
          {workoutsSummary && workoutsSummary.length > 0 ? (
            <Summary workoutsSummary={workoutsSummary} />
          ) : (
              <View style={styles.trackingButtonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => props.navigation.navigate(DashboardStackScreens.Workouts)}>
                  <Text style={styles.buttonText}>Weight Tracking</Text>
                </TouchableOpacity>
              </View>
            )}
          <View style={styles.trackingButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate(DashboardStackScreens.Resistance)}>
              <Text style={styles.buttonText}>Resistance Tracking</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
            {workoutsHistory && <History workoutsHistory={workoutsHistory} />}
            <Highlights awards={awardsSumm} />
            <View style={{ marginTop: 15 }}>
              <Svg width={SVGWidth} height={SVGHeight}>
                <G x={SVGWidth / 2} y={SVGHeight / 2}>
                  {sectionAngles.map(section => (
                    <Path key={section.index} d={arcPath(section)} stroke="#fff" fill={`steelblue`} strokeWidth={3} />
                  ))}
                </G>
              </Svg>
            </View>
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
