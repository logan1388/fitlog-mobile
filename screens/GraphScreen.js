import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import LineGraphWebView from '../components/graphs/LineGraphWebView';

const GraphScreen = props => {
  const workouts = useSelector(state => state.workouts.workouts);

  let linegraphdata = workouts.map(w => {
    return { 'weights': w.weight * w.count, 'date': w.createdDate }
  });

  return (
    <View style={{ flex: 1 }}>
      <LineGraphWebView linegraphdata={linegraphdata} />
    </View>
  );
};

export default GraphScreen;
