import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import LineGraphWebView from '../components/graphs/LineGraphWebView';

const GraphScreen = props => {
  const workouts = useSelector(state => state.workouts.workouts);

  let linegraphdata = workouts.map(w => {
    return { 'weights': w.weight * w.count, 'date': w.createdDate }
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LineGraphWebView linegraphdata={linegraphdata} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
    height: '100%',
    alignItems: 'center',
  }
});

export default GraphScreen;
