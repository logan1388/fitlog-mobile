import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { addHomeExerciseLog } from '../store/actions/actions';
import NumericInput from 'react-native-numeric-input';
import { getTimestamp } from '../utils/getTimeStamp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import RadioButtons from './RadioButtons';

const ResistanceInput = props => {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState(0);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const mode = useSelector(state => state.fitlogReducer.theme);
  const [stopwatchStart, setStopWatchStart] = useState(false);
  const [stopwatchReset, setStopWatchReset] = useState(false);
  const [showStopWatch, setShowStopWatch] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const dispatch = useDispatch();
  let unitRadio = [
    { label: 'lbs', value: 0 },
    { label: 'kgs', value: 1 },
  ];
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  const getFormattedTime = time => {
    let currentTime = time;
    setTime(currentTime);
  };
  const toggleStopWatch = () => {
    setStopWatchStart(!stopwatchStart);
    setShowStopWatch(true);
    setStopWatchReset(false);
  };
  const stopStopWatch = () => {
    setStopWatchStart(false);
    setStopWatchReset(false);
    setShowReset(true);
  };
  const resetStopWatch = () => {
    setStopWatchStart(false);
    setStopWatchReset(true);
    setShowStopWatch(false);
    setShowReset(false);
    setTime(0);
  };

  const resetInput = () => {
    setWeight(0);
    setCount(0);
    setShowReset(false);
    setStopWatchReset(true);
    setShowStopWatch(false);
    setTime(0);
  };

  const addLog = (weight, count, time) => {
    if (time) {
      time = time.substr(3, 5);
      console.log('Time ', time);
    }
    let timestamp = getTimestamp();
    let id = '5dfecbdd39d8760019968d04';
    let exerciseLog = {
      userId: id,
      category: 'resistance',
      name: props.name,
      date: timestamp,
      weight: weight,
      count: count,
      time: time,
    };
    resetInput();
    props.setModalVisible(!props.modalVisible);
    dispatch(addHomeExerciseLog(exerciseLog, props.logs));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, themeContainerStyle]}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={[styles.label, themeTextStyle]}>Reps</Text>
              <NumericInput
                initValue={count}
                value={count}
                onChange={value => setCount(value)}
                type="up-down"
                totalHeight={60}
                totalWidth={100}
                textColor={mode === 'light' ? 'black' : 'bisque'}
                borderColor="darkgrey"
                upDownButtonsBackgroundColor="darkgrey"
              />
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={[styles.label, themeTextStyle]}>Weight</Text>
              <NumericInput
                initValue={weight}
                value={weight}
                onChange={value => setWeight(value)}
                type="up-down"
                totalHeight={60}
                totalWidth={100}
                textColor={mode === 'light' ? 'black' : 'bisque'}
                borderColor="darkgrey"
                upDownButtonsBackgroundColor="darkgrey"
              />
            </View>
            <View>
              <Text style={[styles.label, themeTextStyle]}>Unit</Text>
              <RadioButtons options={unitRadio} unit={unit} setUnit={value => setUnit(value)} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 5 }}>
            <TouchableOpacity
              style={styles.timerButton}
              onPress={() => (stopwatchStart ? stopStopWatch() : toggleStopWatch())}>
              <Text style={styles.buttonText}>{stopwatchStart ? 'Stop' : showReset ? 'Resume' : 'Start'}</Text>
              <Icon name="timer" size={24} color="black" />
              {showStopWatch && (
                <Stopwatch
                  laps
                  start={stopwatchStart}
                  reset={stopwatchReset}
                  options={options}
                  getTime={getFormattedTime}
                />
              )}
            </TouchableOpacity>
            {showReset && (
              <TouchableOpacity style={{ ...styles.timerButton, marginLeft: 15 }} onPress={() => resetStopWatch()}>
                <Text style={styles.buttonText}>Reset</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingBottom: 15,
              marginTop: 20,
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => (weight > 0 || count > 0 || time != 0) && addLog(weight, count, time)}>
              <Icon name="plus-circle-outline" size={50} color="steelblue" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, marginLeft: 15 }}
              onPress={() => props.setModalVisible(!props.modalVisible)}>
              <Icon name="close-circle-outline" size={50} color="tomato" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const options = {
  container: { borderRadius: 5 },
  text: {
    fontSize: 20,
    color: 'black',
  },
};

const styles = StyleSheet.create({
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
  button: {
    backgroundColor: 'transparent',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 10,
  },
  lightContainer: { backgroundColor: 'white' },
  darkContainer: { backgroundColor: '#2D2D2D' },
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
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 15,
  },
});

export default ResistanceInput;
