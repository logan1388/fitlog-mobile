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
    inputsContainer: {
      flexDirection: 'row',
    },
    repsInputContainer: {
      marginLeft: 20,
    },
    unitInputContainer: {
      marginTop: 15,
      alignItems: 'center'
    },
    radioButtons: {
      flexDirection: 'row',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 25,
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
    label: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    addButton: {
      backgroundColor: 'transparent',
    },
    closeButton: {
      backgroundColor: 'transparent',
      marginLeft: 15,
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
    lightThemeText: { color: '#343a40' },
    darkThemeText: { color: 'bisque' },
    floatingButton: {
      position: 'absolute',
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      right: 15,
      bottom: 45,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      margin: 15,
      borderRadius: 10,
      alignItems: 'flex-end',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    modalInnerView: {
      paddingHorizontal: 20,
      paddingTop: 15,
    }
  });
