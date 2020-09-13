// Copyright FitBook

import { StyleSheet } from 'react-native';

export const workoutStyles = () =>
  StyleSheet.create({
    outerContainer: {
      flex: 1,
    },
    workoutTypesContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    workoutSubTypesContainer: {
      flex: 1,
      justifyContent: 'space-between',
      paddingVertical: 15,
    },
    button: {
      backgroundColor: 'darkgrey',
      paddingVertical: 25,
      alignItems: 'center',
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    image: { flex: 1 },
    bg: {
      backgroundColor: 'rgba(238, 238, 238, 0.8)',
      height: '100%',
      paddingBottom: 20,
    },
    innerContainer: {
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
  });
