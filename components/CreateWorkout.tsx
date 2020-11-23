import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import NumericInput from 'react-native-numeric-input';
import { getTimestamp } from '../utils/getTimeStamp';
import RadioButtons from './RadioButtons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateWorkoutModel, WorkoutTypes } from '../commonlib/models/WorkoutModel';
import { RootState } from '../store/actionHelpers';
import { addWorkout } from '../store/workouts';
import { workoutStyles } from '../screens/workouts/WorkoutScreen.style';

interface WorkoutInputProps {
  type?: WorkoutTypes;
  subType?: string;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const WorkoutInput: React.FC<WorkoutInputProps> = props => {
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('');
  const [count, setCount] = useState(0);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const dispatch = useDispatch();
  let unitRadio = [
    { label: 'lbs', value: 'lbs' },
    { label: 'kgs', value: 'kgs' },
  ];
  const [styles, setStyles] = useState(workoutStyles());
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  const resetInput = () => {
    setWeight(0);
    setUnit(unitRadio[0].value);
    setCount(0);
  };

  const addLog = () => {
    let timestamp = getTimestamp();
    let id = '5dfecbdd39d8760019968d04';
    const exerciseLog: CreateWorkoutModel = {
      userId: id,
      type: props.type,
      subType: props.subType?.toLocaleLowerCase(),
      createdDate: new Date(timestamp),
      weight,
      unit,
      count,
    };
    resetInput();
    props.setModalVisible(!props.modalVisible);
    dispatch(addWorkout(exerciseLog));
  };

  React.useEffect(() => {
    setStyles(workoutStyles());
    setUnit(unitRadio[0].value);
  }, [setStyles, setUnit]);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, themeContainerStyle]}>
          {!props.type && (
            <View>
              <Text style={[styles.label, themeTextStyle]}>Type</Text>
            </View>
          )}
          {!props.subType && (
            <View>
              <Text style={[styles.label, themeTextStyle]}>Sub Type</Text>
            </View>
          )}
          <View style={styles.inputsContainer}>
            <View>
              <Text style={[styles.label, themeTextStyle]}>Weight</Text>
              <NumericInput
                initValue={weight}
                value={weight}
                onChange={value => setWeight(value)}
                type="up-down"
                totalHeight={60}
                textColor={mode === 'light' ? 'black' : 'bisque'}
                borderColor="darkgrey"
                upDownButtonsBackgroundColor="darkgrey"
              />
            </View>
            <View style={styles.repsInputContainer}>
              <Text style={[styles.label, themeTextStyle]}>Reps</Text>
              <NumericInput
                initValue={count}
                value={count}
                onChange={value => setCount(value)}
                type="up-down"
                totalHeight={60}
                textColor={mode === 'light' ? 'black' : 'bisque'}
                borderColor="darkgrey"
                upDownButtonsBackgroundColor="darkgrey"
              />
            </View>
          </View>
          <View style={styles.unitInputContainer}>
            <Text style={[styles.label, themeTextStyle]}>Unit</Text>
            <RadioButtons
              options={unitRadio}
              unit={unit}
              style={styles.radioButtons}
              setUnit={(value: string) => setUnit(value)}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => weight > 0 && count > 0 && addLog()}>
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

export default WorkoutInput;
