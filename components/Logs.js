import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Colors from '../constants/colors';

const Logs = (props) => {
  const mode = useSelector((state) => state.fitlogReducer.theme);
  const themeTextStyle =
    mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        {props.resistance ? (
          <FlatList
            data={props.logs}
            renderItem={({ item }) => (
              <View style={styles.logs}>
                {item.note ? (
                  <View style={{ flex: 1 }}>
                    <Icon
                      name="comment-text-outline"
                      size={24}
                      color={mode === 'light' ? 'black' : 'darkgrey'}
                      onPress={() => props.addNotes(item)}
                    />
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    <Icon
                      name="comment-outline"
                      size={24}
                      color={mode === 'light' ? 'black' : 'darkgrey'}
                      onPress={() => props.addNotes(item)}
                    />
                  </View>
                )}
                <View style={{ flex: 3 }}>
                  <Text style={themeTextStyle}>{item.date}</Text>
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                    {item.count ? `${item.count} reps` : '-'}
                  </Text>
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                    {item.time != 0 ? item.time : '-'}
                  </Text>
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                    {item.weight ? `${item.weight} lbs` : '-'}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <FlatList
            data={props.logs}
            renderItem={({ item }) => (
              <View style={styles.logs}>
                {item.note ? (
                  <View style={{ flex: 1 }}>
                    <Icon
                      name="comment-text-outline"
                      size={24}
                      color={mode === 'light' ? 'black' : 'darkgrey'}
                      onPress={() => props.addNotes(item)}
                    />
                  </View>
                ) : (
                  <View style={{ flex: 1 }}>
                    <Icon
                      name="comment-outline"
                      size={24}
                      color={mode === 'light' ? 'black' : 'darkgrey'}
                      onPress={() => props.addNotes(item)}
                    />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  {props.bestSet &&
                  item.weight === props.bestSet.weight &&
                  item.count === props.bestSet.count &&
                  item.date ===
                    moment(props.bestSet.date)
                      .utc()
                      .local()
                      .format('MM/DD/YY HH:mm') ? (
                    <View style={{ flexDirection: 'row' }}>
                      <Icon
                        name="trophy"
                        size={25}
                        color={mode === 'light' ? Colors.buttonColor : 'bisque'}
                      />
                    </View>
                  ) : null}
                </View>
                <View style={{ flex: 2.5 }}>
                  <Text style={themeTextStyle}>{item.date}</Text>
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                    {item.weight} {item.unit}
                  </Text>
                </View>
                <View style={{ flex: 1.5 }}>
                  <Text style={[{ textAlign: 'right' }, themeTextStyle]}>
                    {item.count} reps
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item._id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logs: {
    paddingVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey',
  },
  lightThemeText: { color: 'black' },
  darkThemeText: { color: 'bisque' },
});

export default Logs;
