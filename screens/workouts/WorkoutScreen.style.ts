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
    workoutlogContainer: {
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: 'rgba(238, 238, 238, 0.8)',
      height: '100%',
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
    lightContainer: { backgroundColor: 'white' },
    darkContainer: { backgroundColor: '#2D2D2D' },
    floatingButton: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 15,
      bottom: 45,
    },
  });
