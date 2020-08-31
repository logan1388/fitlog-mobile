import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Notes = (props) => {
  const mode = useSelector((state) => state.fitlogReducer.theme);
  const themeContainerStyle =
    mode === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle =
    mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, themeContainerStyle]}>
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
            onChangeText={(text) => props.setNotes(text)}
            value={props.notes}
          />
          <View style={{ flexDirection: 'row', paddingTop: 15 }}>
            <TouchableHighlight
              style={{ ...styles.openButton, marginRight: 15 }}
              onPress={() => props.saveNotes()}>
              <Icon name="plus-circle-outline" size={50} color="steelblue" />
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.openButton}
              onPress={() => props.setModalVisible(!props.modalVisible)}>
              <Icon name="close-circle-outline" size={50} color="tomato" />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    width: 250,
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
  },
  openButton: { backgroundColor: 'transparent' },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lightContainer: { backgroundColor: 'white' },
  darkContainer: { backgroundColor: '#2D2D2D' },
  lightThemeText: { color: '#343a40' },
  darkThemeText: { color: 'bisque' },
});

export default Notes;
