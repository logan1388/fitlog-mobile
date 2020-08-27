import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

const BestLog = (props) => {
  const mode = useSelector((state) => state.fitlogReducer.theme);
  const themeTextStyle =
    mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  return (
    <View style={{ flexDirection: 'row' }}>
      {props.bestSet && (
        <View style={styles.max}>
          <Text style={[styles.maxText, themeTextStyle]}>Best Set</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={themeTextStyle}>{props.bestSet.weight} </Text>
            <Text style={themeTextStyle}>{props.bestSet.unit} </Text>
            <Text style={themeTextStyle}>{props.bestSet.count} reps</Text>
          </View>
        </View>
      )}
      {props.maxWt && (
        <View style={styles.max}>
          <Text style={[styles.maxText, themeTextStyle]}>Max Weight</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={themeTextStyle}>{props.maxWt.weight} </Text>
            <Text style={themeTextStyle}>{props.maxWt.unit} </Text>
            <Text style={themeTextStyle}>{props.maxWt.count} reps</Text>
          </View>
        </View>
      )}
      {props.maxRps && (
        <View style={styles.max}>
          <Text style={[styles.maxText, themeTextStyle]}>Max Reps</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={themeTextStyle}>
              {props.maxRps.weight ? props.maxRps.weight : ''}{' '}
            </Text>
            <Text style={themeTextStyle}>
              {props.maxRps.weight ? props.maxRps.unit : ''}{' '}
            </Text>
            <Text style={themeTextStyle}>{props.maxRps.count} reps</Text>
          </View>
        </View>
      )}
      {props.maxTime && (
        <View style={styles.max}>
          <Text style={[styles.maxText, themeTextStyle]}>Max Time</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={themeTextStyle}>{props.maxTime.time}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  max: {
    height: 50,
    textAlign: 'center',
    flex: 3,
  },
  maxText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lightThemeText: { color: 'black' },
  darkThemeText: { color: 'bisque' },
});

export default BestLog;
