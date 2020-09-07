// Copyright FitBook

import { StyleSheet } from 'react-native';
import { Style } from '../styles/style';

export const profileStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingHorizontal: 20,
    },
    button: {
      paddingVertical: 25,
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'steelblue',
    },
    innerContainer: {
      flexDirection: 'row',
      marginVertical: 30,
      justifyContent: 'space-between',
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
    themeText: { fontSize: 18 },
    lightContainer: { backgroundColor: 'white' },
    darkContainer: { backgroundColor: '#2D2D2D' },
    lightThemeText: { color: '#343a40' },
    darkThemeText: { color: 'bisque' },
    dataView: {
      marginBottom: 15,
      borderBottomWidth: 0.5,
      borderBottomColor: Style.themed('textInputBorder'),
    },
    labelText: {
      color: Style.themed('labelText'),
      fontSize: 13,
    },
    valueText: {
      marginTop: 3,
      color: Style.themed('formValue'),
      fontSize: 16,
    },
    editProfileButtonText: {
      textAlign: 'right',
      color: Style.themed('activeLink'),
      fontSize: 16,
    },
    editProfileContainer: {
      paddingTop: 20,
    },
  });
