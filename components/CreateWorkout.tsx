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
import DropDownPicker from 'react-native-dropdown-picker';
import { fetchExercises } from '../store/actions/actions';

interface WorkoutInputProps {
  type?: WorkoutTypes;
  subType?: string;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const WorkoutInput: React.FC<WorkoutInputProps> = props => {
  const [type, setType] = useState('');
  const [subType, setSubType] = useState('');
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('');
  const [count, setCount] = useState(0);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  console.log('Mode ', mode);
  const dispatch = useDispatch();
  let unitRadio = [
    { label: 'lbs', value: 'lbs' },
    { label: 'kgs', value: 'kgs' },
  ];
  const [styles, setStyles] = useState(workoutStyles());
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const workoutTypes: string[] = Object.keys(WorkoutTypes);
  let typesdd = workoutTypes.map((w: any) => {
    return {
      'label': w.toLocaleLowerCase(),
      'value': w.toLocaleLowerCase()
    }
  });
  const [typesDD, setTypesDD] = useState(typesdd);
  const [typesValue, setTypesValue] = useState(null);
  const workouts = useSelector<RootState>(state => state.fitlogReducer.workouts);
  console.log('workouts ', workouts);
  let subtypesdd = workouts.slice().map((w: any) => {
    return {
      'label': w.name,
      'value': w.name
    }
  });

  const [subTypesDD, setSubTypesDD] = useState(subtypesdd);
  const [subTypesValue, setSubTypesValue] = useState(null);
  console.log('Sub types ', subtypesdd);

  const resetInput = () => {
    setWeight(0);
    setUnit(unitRadio[0].value);
    setCount(0);
    setType('');
    setSubType('');
    setTypesValue(null);
    setSubTypesValue(null);
    props.setModalVisible(false);
  };

  const addLog = () => {
    let timestamp = getTimestamp();
    let id = '5dfecbdd39d8760019968d04';
    const exerciseLog: CreateWorkoutModel = {
      userId: id,
      type: type,
      subType: subType?.toLocaleLowerCase(),
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
    props.type && setType(props.type);
    props.subType && setSubType(props.subType);
    setTypesDD(typesdd);
    setSubTypesDD(subtypesdd);
    props.type && dispatch(fetchExercises(props.type));
  }, [setStyles, setUnit, setType, setSubType, props.type, props.subType]);
  let controller;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, themeContainerStyle]}>
          <View style={{ marginVertical: 10, zIndex: 20 }}>
            <DropDownPicker
              items={typesdd}
              placeholder="Select a type"
              controller={instance => controller = instance}
              onChangeList={(items, callback) => {
                new Promise((resolve, reject) => resolve(setTypesDD(items)))
                  .then(() => callback())
                  .catch(() => { });
              }}
              disabled={props.type && true}
              defaultValue={props.type}
              onChangeItem={item => {
                dispatch(fetchExercises(item.value.toLocaleLowerCase()));
                setTypesValue(item.value);
                setType(item.value);
              }}
              containerStyle={{ width: 200, height: 45 }}
            />
          </View>
          <View style={{ marginVertical: 10, zIndex: 10 }}>
            <DropDownPicker
              items={subtypesdd}
              placeholder="Select a subtype"
              controller={instance => controller = instance}
              onChangeList={(items, callback) => {
                new Promise((resolve, reject) => resolve(setSubTypesDD(items)))
                  .then(() => callback())
                  .catch(() => { });
              }}
              disabled={(props.subType && true) || !type}
              defaultValue={props.subType}
              onChangeItem={item => setSubTypesValue(item.value)}
              containerStyle={{ width: 200, height: 45 }}
            />
          </View>
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
            <TouchableOpacity style={styles.closeButton} onPress={resetInput}>
              <Icon name="close-circle-outline" size={50} color="tomato" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default WorkoutInput;
