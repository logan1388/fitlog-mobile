// Copyright FitBook

import { StyleSheet } from 'react-native';

export const graphStyles = () =>
  StyleSheet.create({
    outerContainer: {
      flex: 1
    },
    innerContainer: {
      backgroundColor: 'white',
      height: '100%',
    },
    lineGraphWV: {
      paddingVertical: 30,
      paddingHorizontal: 20,
    }
  });
