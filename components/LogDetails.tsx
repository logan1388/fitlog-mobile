import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../store/actionHelpers';
import { WorkoutModel } from '../commonlib/models/WorkoutModel';

interface LogDetailsProps {
  log: WorkoutModel;
  setLogDetailsModalVisible: (value: boolean) => void;
}

const LogDetails: React.FC<LogDetailsProps> = props => {
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeButtonColor = mode === 'light' ? 'black' : 'black';

  return (
    <View style={[styles.centeredView]}>
      <View style={[styles.modalView]}>
        <View style={{ flexDirection: 'row', borderBottomWidth: 1, width: '100%', justifyContent: 'space-between' }}>
          <Text style={{ textAlign: 'left', paddingVertical: 15, paddingHorizontal: 20 }}>Entry Details</Text>
          <TouchableOpacity onPress={() => props.setLogDetailsModalVisible(false)}>
            <Icon name="close" size={30} style={{ top: 8, right: 15, alignItems: 'flex-end' }} color={themeButtonColor} />
          </TouchableOpacity>
        </View>
        <View style={[styles.modalInnerView, { width: '100%' }]}>
          <View style={{ width: '100%', alignContent: 'flex-start', marginVertical: 10 }}>
            <Text style={{ textAlign: 'left', paddingBottom: 5 }}>Date</Text>
            <Text style={[themeTextStyle]}>{props.log.date}</Text>
          </View>
          <View style={{ width: '100%', alignContent: 'flex-start', marginVertical: 10 }}>
            <Text style={{ textAlign: 'left', paddingBottom: 5 }}>Weight</Text>
            <Text style={[themeTextStyle]}>{props.log.weight}</Text>
          </View>
          <View style={{ width: '100%', alignContent: 'flex-start', marginVertical: 10 }}>
            <Text style={{ textAlign: 'left', paddingBottom: 5 }}>Reps</Text>
            <Text style={[themeTextStyle]}>{props.log.count}</Text>
          </View>
          <View style={{ width: '100%', alignContent: 'flex-start', marginVertical: 10 }}>
            <Text style={{ textAlign: 'left', paddingBottom: 5 }}>Time</Text>
            <Text style={[themeTextStyle]}>{props.log.time}</Text>
          </View>
          <View style={{ width: '100%', alignContent: 'flex-start', marginVertical: 10 }}>
            <Text style={{ textAlign: 'left', paddingBottom: 5 }}>Notes</Text>
            <Text style={[themeTextStyle]}>{props.log.note}</Text>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  lightContainer: { backgroundColor: 'white' },
  darkContainer: { backgroundColor: '#2D2D2D' },
  lightThemeText: { color: 'black' },
  darkThemeText: { color: 'black' },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalInnerView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
});

export default LogDetails;
