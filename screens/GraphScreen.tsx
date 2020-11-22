import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import LineGraphWebView from '../components/graphs/LineGraphWebView';
import { RootState } from '../store/actionHelpers';
import { WorkoutModel } from '../commonlib/models/WorkoutModel';

interface WorkoutsReduxState {
  workouts?: WorkoutModel[];
}

const GraphScreen = () => {
  const workoutsReduxState = useSelector<RootState, WorkoutsReduxState>(state => {
    const workouts = state.workouts.workouts;
    return { workouts };
  });
  const { workouts } = workoutsReduxState;

  let linegraphdata = workouts?.map(w => {
    return { weights: w.weight * w.count, date: w.createdDate };
  });

  return (
    <View style={{ flex: 1 }}>
      <LineGraphWebView linegraphdata={linegraphdata} />
    </View>
  );
};

export default GraphScreen;
