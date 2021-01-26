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
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    workoutSubTypesContainer: {
      flex: 1,
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    workoutlogContainer: {
      paddingBottom: 45,
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
      alignItems: 'center',
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
      paddingVertical: 15,
      paddingHorizontal: 25,
      alignItems: 'center',
      marginHorizontal: 5,
      flexDirection: 'row'
    },
    subtypesButton: {
      backgroundColor: 'darkgrey',
      paddingVertical: 15,
      alignItems: 'center',
      marginHorizontal: 5,
      height: 150
    },
    buttonText: {
      flex: 1,
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
      paddingTop: 10,
      paddingBottom: 15,
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
    },
    itemInvisible: {
      backgroundColor: 'transparent'
    },
    workoutTypeIcons: {
      width: 100,
      height: 90
    },
    workoutSubTypeIcons: {
      width: 90,
      height: 90
    }
  });
