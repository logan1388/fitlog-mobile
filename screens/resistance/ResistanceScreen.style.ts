// Copyright FitBook

import { StyleSheet } from 'react-native';

export const resistanceStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    insideContainer: {
      flex: 1,
      justifyContent: 'space-between',
      marginVertical: 5,
    },
    button: {
      backgroundColor: 'darkgrey',
      paddingVertical: 15,
      alignItems: 'center',
      marginHorizontal: 5,
      height: 150
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
    logsBg: {
      backgroundColor: 'rgba(238, 238, 238, 0.8)',
      height: '100%',
      paddingBottom: 60,
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
    label: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 10,
    },
    timerButton: {
      backgroundColor: 'darkgrey',
      paddingVertical: 15,
      paddingHorizontal: 5,
      alignItems: 'center',
      flexDirection: 'row',
    },
    timerResetButton: {
      backgroundColor: 'darkgrey',
      paddingVertical: 15,
      paddingHorizontal: 5,
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: 15,
    },
    addButton: {
      backgroundColor: 'transparent',
    },
    closeButton: {
      backgroundColor: 'transparent',
      marginLeft: 15,
    },
    timerButtonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
      paddingHorizontal: 10,
    },
    lightThemeText: { color: '#343a40' },
    darkThemeText: { color: 'bisque' },
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 15,
      marginTop: 20,
    },
    timerContainer: {
      flexDirection: 'row',
      marginTop: 5,
      marginBottom: 20,
      justifyContent: 'center',
    },
    weightInputContainer: {
      marginHorizontal: 20,
    },
    inputContainer: {
      flexDirection: 'row',
    },
    modalInnerView: {
      paddingHorizontal: 20,
      paddingTop: 15,
    },
    itemInvisible: {
      backgroundColor: 'transparent'
    },
    resistanceIcons: {
      width: 90,
      height: 90
    }
  });
