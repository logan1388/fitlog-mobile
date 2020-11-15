import React from 'react';
import { View, StyleSheet } from 'react-native';
import LineGraphWebView from '../components/graphs/LineGraphWebView';

const GraphScreen = props => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <LineGraphWebView />
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
