import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Stopwatch as StopWatchDeprecated } from 'react-native-stopwatch-timer';
import RadioButtons from './RadioButtons';
import { resistanceStyles } from '../screens/resistance/ResistanceScreen.style';
import { RootState } from '../store/actionHelpers';

interface LogInputProps {
  weight: number;
  count: number;
  unit: string;
  setWeight: (value: number) => void;
  setCount: (value: number) => void;
  setUnit: (value: string) => void;
  setTime: (value: number) => void;
}

const LogInputs: React.FC<LogInputProps> = props => {
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [stopwatchStart, setStopWatchStart] = useState(false);
  const [stopwatchReset, setStopWatchReset] = useState(false);
  const [showStopWatch, setShowStopWatch] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [styles, setStyles] = useState(resistanceStyles());
  let unitRadio = [
    { label: 'lbs', value: 'lbs' },
    { label: 'kgs', value: 'kgs' },
  ];
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  const getFormattedTime = (time: number) => {
    let currentTime = time;
    props.setTime(currentTime);
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
    props.setTime(0);
  };

  React.useEffect(() => {
    setStyles(resistanceStyles());
    props.setUnit(unitRadio[0].value);
  }, [setStyles, props.setUnit]);

  return (
    <View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={[styles.label, themeTextStyle]}>Reps</Text>
          <NumericInput
            initValue={props.count}
            value={props.count}
            onChange={value => props.setCount(value)}
            type="up-down"
            totalHeight={55}
            totalWidth={100}
            textColor={mode === 'light' ? 'black' : 'bisque'}
            borderColor="darkgrey"
            upDownButtonsBackgroundColor="darkgrey"
          />
        </View>
        <View style={styles.weightInputContainer}>
          <Text style={[styles.label, themeTextStyle]}>Weight</Text>
          <NumericInput
            initValue={props.weight}
            value={props.weight}
            onChange={value => props.setWeight(value)}
            type="up-down"
            totalHeight={55}
            totalWidth={100}
            textColor={mode === 'light' ? 'black' : 'bisque'}
            borderColor="darkgrey"
            upDownButtonsBackgroundColor="darkgrey"
          />
        </View>
        <View>
          <Text style={[styles.label, themeTextStyle]}>Unit</Text>
          <RadioButtons options={unitRadio} unit={props.unit} setUnit={(value: string) => props.setUnit(value)} />
        </View>
      </View>
      <View style={styles.timerContainer}>
        <TouchableOpacity
          style={styles.timerButton}
          onPress={() => (stopwatchStart ? stopStopWatch() : toggleStopWatch())}>
          <Text style={styles.timerButtonText}>{stopwatchStart ? 'Stop' : showReset ? 'Resume' : 'Start'}</Text>
          <Icon name="timer" size={24} color="black" />
          {showStopWatch && (
            <StopWatchDeprecated
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
      <View>
        <TextInput
          style={[
            {
              borderColor: 'gray',
              borderWidth: 1,
              width: '100%',
              height: 90,
            },
            themeTextStyle,
          ]}
          placeholder="Notes"
          placeholderTextColor={mode === 'light' ? '#343a40' : 'bisque'}
          multiline
          numberOfLines={4}
          maxLength={100}
          onChangeText={text => props.setNotes(text)}
          value={props.notes}
        />
      </View>
    </View>
  );
};

const options = {
  container: { borderRadius: 5 },
  text: {
    fontSize: 20,
    color: 'black',
  },
};

export default LogInputs;
