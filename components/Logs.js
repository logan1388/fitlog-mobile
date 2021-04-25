import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, SectionList, TouchableOpacity, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import LogDetails from '../components/LogDetails';

const Logs = props => {
  const mode = useSelector(state => state.fitlogReducer.theme);
  const [logDetailsModalVisible, setLogDetailsModalVisible] = useState(false);
  const [log, setLog] = useState({});
  const [notesVisible, setNotesVisible] = useState(false);
  const [notes, setNotes] = useState('');
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    mode === 'light'
      ? logDetailsModalVisible
        ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        : styles.lightContainer
      : logDetailsModalVisible
        ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' }
        : styles.darkContainer;
  let logs = props.logs;
  logs = logs.map(l => ({ ...l, date: moment(l.createdDate).utc().local().format('MMM DD, YYYY'), notesVisible: false }));

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  const grouped = groupBy(logs, log => log.date);
  const data = logs.map(l => {
    return {
      title: l.date,
      data: grouped.get(l.date),
      notesVisible: false
    };
  });

  let newLogs = [...new Map(data.map(item => [item['title'], item])).values()];

  const getLogDetails = log => {
    log.notesVisible = !notesVisible;
    console.log('Inside getlogdetails log', log);
    setLog(log);
    //newLogs.forEach(l => l.notesVisible = l.data._id === log._id ? true : false);
    newLogs.forEach(l => l.data.forEach(lg => lg.notesVisible = ((lg._id === log._id) && log.notesVisible) ? true : false))
    setNotesVisible(!notesVisible);
  }

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      {logs && logs.length ? (
        <View>
          <Modal animationType="none" transparent={true} visible={logDetailsModalVisible}>
            <LogDetails log={log} setLogDetailsModalVisible={setLogDetailsModalVisible} />
          </Modal>
          <View>
            <Text style={[{ padding: 10, fontWeight: 'bold' }, themeTextStyle]}>Recent Entries</Text>
          </View>
          <SectionList
            sections={newLogs}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={[styles.logs, { borderTopWidth: 1, borderColor: 'slategrey' }]}>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 1 }}>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>Weight</Text>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                      {item.weight ? `${item.weight} lbs` : '-'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>Reps</Text>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                      {item.count ? `${item.count} reps` : '-'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>Time</Text>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.time != 0 ? notesVisible : '-'}</Text>
                  </View>
                  <TouchableOpacity style={{ flex: 1 }} onPress={() => getLogDetails(item)}>
                    <Icon name="chevron-right" size={30} color="black" style={[{ textAlign: 'right' }, themeTextStyle]} />
                  </TouchableOpacity>
                </View>
                {notesVisible && log._id == item._id && <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 2 }}>
                    <Text style={[themeTextStyle]}>Notes</Text>
                  </View>
                  <View style={{ flex: 7 }}>
                    <Text style={[themeTextStyle]}>{item.notesVisible}</Text>
                  </View>
                </View>}
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={{ flex: 1, backgroundColor: 'slategrey', paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={themeTextStyle}>{title}</Text>
              </View>
            )} />
        </View>) : (
        <View style={styles.noDataText}>
          <Text style={themeTextStyle}>Start logging!</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logs: {
    paddingVertical: 5,
    flex: 1,
    justifyContent: 'space-between',
  },
  lightContainer: { backgroundColor: 'white' },
  darkContainer: { backgroundColor: '#2D2D2D' },
  lightThemeText: { color: 'black' },
  darkThemeText: { color: 'snow' },
  noDataText: {
    alignItems: 'center',
  },
  workoutlogContainer: {
    backgroundColor: 'rgba(238, 238, 238, 0.8)',
    height: '100%',
  },
});

export default Logs;
