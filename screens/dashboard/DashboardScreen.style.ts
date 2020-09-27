// Copyright FitBook

import { StyleSheet } from 'react-native';

export const dashboardStyles = () =>
  StyleSheet.create({
    safeAreaViewContainer: {
      flex: 1,
    },
    container: {
      flex: 1,
      backgroundColor: 'rgba(238, 238, 238, 0.8)',
    },
    image: { flex: 1 },
    innerContainer: {
      height: '100%',
      alignItems: 'center',
      paddingVertical: 30,
    },
    trackingButtonContainer: {
      width: '100%',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginVertical: 30,
    },
    card: {
      justifyContent: 'space-between',
      backgroundColor: 'darkgrey',
      marginHorizontal: 15,
      maxHeight: 250,
    },
    button: {
      backgroundColor: 'steelblue',
      paddingVertical: 25,
      alignItems: 'center',
      width: '100%',
    },
    buttonText: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    text: {
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
      fontSize: 18,
    },
    logs: {
      paddingVertical: 8,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: 'black',
    },
    lightContainer: { backgroundColor: 'white' },
    darkContainer: { backgroundColor: '#2D2D2D' },
    lightThemeText: { color: '#343a40' },
    darkThemeText: { color: 'bisque' },
    summaryContainer: {
      width: '100%',
    },
    historyContainer: {
      width: '100%',
    },
    historyTypeContainer: {
      flex: 2,
    },
    historyDateContainer: {
      flex: 1,
    },
    historyDate: {
      textAlign: 'right',
    },
    summarySubTypeTextContainer: {
      flex: 2,
    },
    summaryWeightTextContainer: {
      flex: 1,
    },
    summaryRepsTextContainer: {
      flex: 1,
    },
    summaryWeightText: {
      textAlign: 'right',
    },
    summaryRepsText: {
      textAlign: 'right',
    },
    highlightsContainer: {
      width: '100%'
    },
    highlightsRowContainer: {
      flexDirection: 'row',
      paddingBottom: 10
    },
    highlightsCardContainer: {
      width: '100%',
      marginTop: 20
    },
    highlightsIconContainer: {
      flex: 1
    },
    highlightsSubTypeContainer: {
      flex: 3
    },
    highlightsWeightContainer: {
      flex: 1.5
    },
    highlightsRepsContainer: {
      flex: 1.5
    },
    highlightsWeightText: {
      textAlign: 'right'
    },
    highlightsRepsText: {
      textAlign: 'right'
    }
  });
