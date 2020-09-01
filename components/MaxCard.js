import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const MaxCard = (props) => {
  const mode = useSelector((state) => state.fitlogReducer.theme);
  const themeContainerStyle =
    mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle =
    mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  return (
    <View
      style={[
        styles.container,
        themeContainerStyle,
        { shadowColor: mode === 'light' ? 'black' : 'bisque' },
      ]}>
      <View
        style={[
          styles.titleContainer,
          { backgroundColor: mode === 'light' ? 'steelblue' : 'darkgrey' },
        ]}>
        <Text style={{ padding: 10, fontSize: 16, fontWeight: 'bold' }}>
          {props.title}
        </Text>
      </View>
      {!props.time ? (
        <View style={{ padding: 10 }}>
          {props.weight > 0 && (
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Text style={themeTextStyle}>{props.weight} </Text>
              <Text style={themeTextStyle}>{props.unit} </Text>
            </View>
          )}
          <View style={{ alignItems: 'center' }}>
            <Text style={themeTextStyle}>{props.count} reps</Text>
          </View>
        </View>
      ) : (
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={themeTextStyle}>{props.time}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'bisque',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.8,
    elevation: 8,
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 20,
    flex: 0.5,
    justifyContent: 'space-evenly',
  },
  titleContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    backgroundColor: 'steelblue',
  },
  lightContainer: { backgroundColor: 'white' },
  darkContainer: { backgroundColor: '#2D2D2D' },
  lightThemeText: { color: 'black' },
  darkThemeText: { color: 'bisque' },
});

export default MaxCard;
