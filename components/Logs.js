import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, SectionList } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const Logs = props => {
  const mode = useSelector(state => state.fitlogReducer.theme);
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
  let logs = props.logs;
  logs = logs.map(l => ({ ...l, date: moment(l.createdDate).utc().local().format('MMM DD, YYYY') }));

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
    };
  });

  const newLogs = [...new Map(data.map(item => [item['title'], item])).values()];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {logs && logs.length ? (
        <View>
          <View>
            <Text style={{ padding: 10, fontWeight: 'bold' }}>Recent Entries</Text>
          </View>
          <SectionList
            sections={newLogs}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => (
              <View style={[styles.logs, { borderTopWidth: 1 }]}>
                <View style={{ flexDirection: 'row', paddingBottom: 5 }}>
                  <View style={{ flex: 1 }}></View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'right' }}>Weight</Text>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                      {item.weight ? `${item.weight} lbs` : '-'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'right' }}>Reps</Text>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                      {item.count ? `${item.count} reps` : '-'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: 'right' }}>Time</Text>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.time != 0 ? item.time : '-'}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Icon name="chevron-right" size={30} color="black" style={{ textAlign: 'right' }} />
                  </View>
                </View>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={{ flex: 1, backgroundColor: 'lightgrey', paddingVertical: 3, paddingHorizontal: 10 }}>
                <Text style={themeTextStyle}>{title}</Text>
              </View>
            )}
          />
        </View>
      ) : (
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
  lightThemeText: { color: 'black' },
  darkThemeText: { color: 'bisque' },
  noDataText: {
    alignItems: 'center',
  },
});

export default Logs;
