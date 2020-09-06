// Copyright FitBook

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    borderBottomColor: '#767676',
  },
  labelText: {
    color: '#767676',
    fontSize: 13,
  },
  valueText: {
    marginTop: 3,
    color: '#323130',
    fontSize: 16,
  },
  editProfileButtonText: {
    textAlign: 'right',
    color: '#0078d4',
    fontSize: 16,
  },
  editProfileContainer: {
    paddingTop: 20,
  },
});
