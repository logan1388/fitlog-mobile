import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { addExerciseLog } from '../store/actions/actions';
import NumericInput from 'react-native-numeric-input';
import { getTimestamp } from '../utils/getTimeStamp';
import RadioButtons from './RadioButtons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WorkoutInput = (props) => {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState(0);
  const [count, setCount] = useState(0);
  const mode = useSelector((state) => state.fitlogReducer.theme);
  const dispatch = useDispatch();
  let unitRadio = [
    { label: 'lbs', value: 0 },
    { label: 'kgs', value: 1 },
  ];
  const themeContainerStyle =
    mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle =
    mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  const resetInput = () => {
    setWeight(0);
    setUnit(0);
    setCount(0);
  };

  const addLog = (weight, unit, count) => {
    let timestamp = getTimestamp();
    let id = '5dfecbdd39d8760019968d04';
    let exerciseLog = {
      userId: id,
      category: props.category,
      name: props.name,
      date: timestamp,
      weight: weight,
      unit: unit === 0 ? 'lbs' : 'kgs',
      count: count,
    };
    resetInput();
    props.setModalVisible(!props.modalVisible);
    dispatch(addExerciseLog(exerciseLog, props.logs, props.workouts));
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, themeContainerStyle]}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={[styles.label, themeTextStyle]}>Weight</Text>
              <NumericInput
                initValue={weight}
                value={weight}
                onChange={(value) => setWeight(value)}
                type="up-down"
                totalHeight={60}
                textColor={mode === 'light' ? 'black' : 'bisque'}
                borderColor="darkgrey"
                upDownButtonsBackgroundColor="darkgrey"
              />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={[styles.label, themeTextStyle]}>Reps</Text>
              <NumericInput
                initValue={count}
                value={count}
                onChange={(value) => setCount(value)}
                type="up-down"
                totalHeight={60}
                textColor={mode === 'light' ? 'black' : 'bisque'}
                borderColor="darkgrey"
                upDownButtonsBackgroundColor="darkgrey"
              />
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <Text style={[styles.label, themeTextStyle]}>Unit</Text>
            <RadioButtons
              options={unitRadio}
              unit={unit}
              style={{ flexDirection: 'row' }}
              setUnit={(value) => setUnit(value)}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              paddingVertical: 25,
            }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                weight > 0 && count > 0 && addLog(weight, unit, count)
              }>
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

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'transparent',
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
    padding: 35,
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

export default WorkoutInput;
