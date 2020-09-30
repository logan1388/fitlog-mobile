import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { WorkoutHistoryModel } from '../commonlib/models/WorkoutModel';
import { dashboardStyles } from '../screens/dashboard/DashboardScreen.style';
import moment from 'moment';
import { RootState } from '../store/actionHelpers';
import Card from './Card';

interface HistoryProps {
  workoutsHistory: WorkoutHistoryModel[];
}

const History: React.FC<HistoryProps> = props => {
  const dispatch = useDispatch();
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(dashboardStyles());
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  React.useEffect(() => {
    setStyles(dashboardStyles());
  }, [dispatch, setStyles]);

  const last5Workouts = (
    <View style={styles.historyContainer}>
      <ScrollView>
        {props.workoutsHistory &&
          props.workoutsHistory.slice(0, 5).map(item => (
            <View style={styles.logs} key={item._id}>
              <View style={styles.historyTypeContainer}>
                <Text>{item.type}</Text>
              </View>
              <View style={styles.historyDateContainer}>
                <Text style={styles.historyDate}>{moment(item.createdDate).format('MM/DD/YY')}</Text>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.historyContainer}>
      <Text style={[styles.text, themeTextStyle]}>Last 5 Workouts</Text>
      <Card style={styles.card}>{last5Workouts}</Card>
    </View>
  );
};

export default History;
