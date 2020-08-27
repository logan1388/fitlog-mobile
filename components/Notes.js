import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  TouchableHighlight,
  Keyboard,
} from 'react-native';

const Notes = (props) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            style={{
              borderColor: 'gray',
              borderWidth: 1,
              width: '100%',
              height: 90,
            }}
            placeholder="Notes"
            multiline
            numberOfLines={4}
            maxLength={100}
            onChangeText={(text) => props.setNotes(text)}
            value={props.notes}
          />
          <View style={{ flexDirection: 'row' }}>
            <TouchableHighlight
              style={{
                ...styles.openButton,
                backgroundColor: 'lightgrey',
                marginRight: 15,
              }}
              onPress={() => props.saveNotes()}>
              <Text style={styles.textStyle}>Save</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: 'lightgrey' }}
              onPress={() => props.setModalVisible(!props.modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
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
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Notes;
