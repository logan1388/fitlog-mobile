import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import { getTimestamp } from '../utils/getTimeStamp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CreateWorkoutModel, WorkoutTypes, SubWorkoutTypes } from '../commonlib/models/WorkoutModel';
import { RootState } from '../store/actionHelpers';
import { addWorkout } from '../store/workouts';
import { workoutStyles } from '../screens/workouts/WorkoutScreen.style';
import DropDownPicker from 'react-native-dropdown-picker';
import LogInputs from './LogInputs';

interface WorkoutInputProps {
  type?: WorkoutTypes;
  subType?: string;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const WorkoutInput: React.FC<WorkoutInputProps> = props => {
  const [type, setType] = useState(props.type ? props.type : '');
  const [subType, setSubType] = useState('');
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('');
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const dispatch = useDispatch();
  let unitRadio = [
    { label: 'lbs', value: 'lbs' },
    { label: 'kgs', value: 'kgs' },
  ];
  const [styles, setStyles] = useState(workoutStyles());
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const workoutTypes: string[] = Object.keys(WorkoutTypes);
  let typesdd = workoutTypes.map((w: any) => {
    return {
      label: w.toLocaleLowerCase(),
      value: w.toLocaleLowerCase(),
    };
  });

  const getSubTypes = (type: string) => {
    for (let sub of SubWorkoutTypes) {
      if (sub.type === type) {
        subtypesdd = sub.subtypes.map((t: any) => {
          return {
            label: t,
            value: t,
          };
        });
      }
    }
  };

  let subtypesdd: { label: any; value: any }[] = [];
  if (!type) {
    subtypesdd = [{ label: '', value: '' }];
  } else {
    getSubTypes(type);
  }

  const resetInput = () => {
    setWeight(0);
    setUnit(unitRadio[0].value);
    setCount(0);
    setType('');
    setSubType('');
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
    props.subType && setSubType(props.subType);
  }, [setStyles, setUnit, setSubType, props.subType]);
  let controller;

  return (
    <View style={styles.centeredView}>
      <View style={[styles.modalView, themeContainerStyle]}>
        <TouchableOpacity onPress={resetInput}>
          <Icon name="close" size={40} style={{ top: 10, right: 15 }} />
        </TouchableOpacity>
        <View style={styles.modalInnerView}>
          <View style={{ marginVertical: 10, zIndex: 20 }}>
            <DropDownPicker
              items={typesdd}
              placeholder="Select a type"
              controller={instance => (controller = instance)}
              disabled={props.type && true}
              defaultValue={props.type}
              onChangeItem={item => {
                getSubTypes(item.value);
                setType(item.value);
              }}
              containerStyle={{ width: '100%', height: 45 }}
            />
          </View>
          <View style={{ marginVertical: 10, zIndex: 10 }}>
            <DropDownPicker
              items={subtypesdd}
              placeholder="Select a subtype"
              controller={instance => (controller = instance)}
              disabled={(props.subType && true) || !type}
              defaultValue={props.subType}
              onChangeItem={item => setSubType(item.value)}
              containerStyle={{ width: '100%', height: 45 }}
            />
          </View>
          <LogInputs
            weight={weight}
            count={count}
            unit={unit}
            setWeight={setWeight}
            setCount={setCount}
            setUnit={setUnit}
            setTime={setTime}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => weight > 0 && count > 0 && addLog()}>
              <Icon name="plus-circle-outline" size={50} color="steelblue" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkoutInput;
