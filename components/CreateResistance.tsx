import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { getTimestamp } from '../utils/getTimeStamp';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { resistanceStyles } from '../screens/resistance/ResistanceScreen.style';
import { RootState } from '../store/actionHelpers';
import { addResistance } from '../store/resistance';
import { CreateResistanceModel, ResistanceTypes } from '../commonlib/models/ResistanceModel';
import LogInputs from './LogInputs';
import DropDownPicker from 'react-native-dropdown-picker';

interface ResistanceInputProps {
  name?: ResistanceTypes;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

const ResistanceInput: React.FC<ResistanceInputProps> = props => {
  const [type, setType] = useState(props.name ? props.name : '');
  const [weight, setWeight] = useState(0);
  const [unit, setUnit] = useState('');
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(resistanceStyles());
  const dispatch = useDispatch();
  let unitRadio = [
    { label: 'lbs', value: 'lbs' },
    { label: 'kgs', value: 'kgs' },
  ];
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;

  const resetInput = () => {
    setWeight(0);
    setCount(0);
    setTime(0);
    setType('');
    props.setModalVisible(false);
  };

  const resistanceTypes: string[] = Object.values(ResistanceTypes);
  let typesdd = resistanceTypes.map((w: any) => {
    return {
      label: w.toLocaleLowerCase(),
      value: w.toLocaleLowerCase(),
    };
  });

  const addLog = () => {
    let timestamp = getTimestamp();
    let id = '5dfecbdd39d8760019968d04';
    const newResistance: CreateResistanceModel = {
      userId: id,
      type: props.name,
      createdDate: new Date(timestamp),
      weight,
      unit,
      count,
      time: time ? time.toString().substr(3, 5) : undefined,
    };
    resetInput();
    props.setModalVisible(!props.modalVisible);
    dispatch(addResistance(newResistance));
  };

  React.useEffect(() => {
    setStyles(resistanceStyles());
    setUnit(unitRadio[0].value);
  }, [setStyles, setUnit]);

  let controller;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                disabled={props.name && true}
                defaultValue={props.name}
                onChangeItem={item => {
                  setType(item.value);
                }}
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
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => (weight > 0 || count > 0 || time !== 0) && addLog()}>
                <Icon name="plus-circle-outline" size={50} color="steelblue" />
              </TouchableOpacity>
            </View>
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
