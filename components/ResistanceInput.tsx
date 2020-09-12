import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { getTimestamp } from '../utils/getTimeStamp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import RadioButtons from './RadioButtons';
import { resistanceStyles } from '../screens/resistance/ResistanceScreen.style';
import { ResistanceModel } from '../commonlib/models/ResistanceModel';
import { RootState } from '../store/actionHelpers';
import { addResistance } from '../store/resistance';

interface ResistanceInputProps {
  category: string;
  name: string;
  logs: ResistanceModel;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResistanceInput: React.FC<ResistanceInputProps> = props => {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState(0);
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [stopwatchStart, setStopWatchStart] = useState(false);
  const [stopwatchReset, setStopWatchReset] = useState(false);
  const [showStopWatch, setShowStopWatch] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [styles, setStyles] = useState(resistanceStyles());
  const dispatch = useDispatch();
  let unitRadio = [
    { label: 'lbs', value: 0 },
    { label: 'kgs', value: 1 },
  ];
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  const getFormattedTime = (time: number) => {
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

  const addLog = (weight: number, count: number, time: string) => {
    if (time) {
      time = time.substr(3, 5);
      console.log('Time ', time);
    }
    let timestamp = getTimestamp();
    let id = '5dfecbdd39d8760019968d04';
    let exerciseLog = {
      userId: id,
      category: props.category,
      name: props.name,
      date: timestamp,
      weight: weight,
      count: count,
      time: time,
    };
    resetInput();
    props.setModalVisible(!props.modalVisible);
    dispatch(addResistance(exerciseLog));
  };

  React.useEffect(() => {
    setStyles(resistanceStyles());
  }, [setStyles]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, themeContainerStyle]}>
          <View style={styles.inputContainer}>
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
            <View style={styles.weightInputContainer}>
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
          <View style={styles.timerContainer}>
            <TouchableOpacity
              style={styles.timerButton}
              onPress={() => (stopwatchStart ? stopStopWatch() : toggleStopWatch())}>
              <Text style={styles.timerButtonText}>{stopwatchStart ? 'Stop' : showReset ? 'Resume' : 'Start'}</Text>
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
              <TouchableOpacity style={styles.timerResetButton} onPress={() => resetStopWatch()}>
                <Text style={styles.timerButtonText}>Reset</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => (weight > 0 || count > 0 || time != 0) && addLog(weight, count, time)}>
              <Icon name="plus-circle-outline" size={50} color="steelblue" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => props.setModalVisible(!props.modalVisible)}>
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

export default ResistanceInput;
