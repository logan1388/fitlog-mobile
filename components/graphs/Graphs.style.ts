// Copyright FitBook

import { StyleSheet } from 'react-native';

export const graphStyles = () =>
  StyleSheet.create({
    outerContainer: {
      flex: 1,
    },
    innerContainer: {
      height: '100%',
    },
    lineGraphWV: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: 'transparent',
    },
    lightContainer: { backgroundColor: 'white' },
    darkContainer: { backgroundColor: '#2D2D2D' },
    lightThemeText: { color: 'black' },
    darkThemeText: { color: 'bisque' },
  });
