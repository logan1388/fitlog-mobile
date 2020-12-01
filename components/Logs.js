import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Colors from '../constants/colors';

const Logs = props => {
  const mode = useSelector(state => state.fitlogReducer.theme);
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const logs = props.logs;
  // logs.map(l => l.date = 1);
  // console.log('logs ', logs);
  // var groupBy = function(xs, key) {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };
  // console.log('New logs ', groupBy(logs, 'createdDate'))

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {logs && logs.length ? (
        <View>
          <View>
            <Text style={{ padding: 10, fontWeight: 'bold' }}>Recent Entries</Text>
          </View>
          <FlatList
            data={logs}
            renderItem={({ item }) => (
              <View style={styles.logs}>
                <View style={{ flex: 1, backgroundColor: 'lightgrey', paddingVertical: 3, paddingHorizontal: 10 }}>
                  <Text style={themeTextStyle}>{moment(item.createdDate).utc().local().format('MMM DD, YYYY')}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
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
                    <Text style={{ textAlign: 'right' }}>Date</Text>
                    <Text style={[{ textAlign: 'right' }, themeTextStyle]}>{item.date}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Icon name="chevron-right" size={30} color="black" style={{ textAlign: 'right' }} />
                  </View>
                </View>
              </View>
            )}
            keyExtractor={item => item._id}
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
