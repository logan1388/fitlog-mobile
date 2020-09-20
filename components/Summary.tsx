import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { WorkoutModel } from '../commonlib/models/WorkoutModel';
import { dashboardStyles } from '../screens/dashboard/DashboardScreen.style';
import { RootState } from '../store/actionHelpers';
import Card from './Card';

interface HistoryProps {
  workoutSummary: WorkoutModel[];
}

const Summary: React.FC<HistoryProps> = props => {
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(dashboardStyles());
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  React.useEffect(() => {
    setStyles(dashboardStyles());
  }, [setStyles]);

  const todaySummary = props.workoutSummary.length > 0 && (
    <View style={{ width: '100%' }}>
      <ScrollView>
        {props.workoutSummary.map(item => (
          <View style={styles.logs} key={item._id}>
            <View style={{ flex: 2 }}>
              <Text>{item.subType}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'right' }}>
                {item.weight} {item.unit}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'right' }}>{item.count} reps</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ width: '100%' }}>
      {props.workoutSummary && props.workoutSummary.length > 0 ? (
        <View style={styles.summaryOutsideContainer}>
          <View style={styles.summaryInsideContainer}>
            <Text style={[styles.text, themeTextStyle]}>Today's Summary</Text>
            <Card style={styles.card}>{todaySummary}</Card>
          </View>
        </View>
      ) : (
        <View style={styles.trackingButtonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate(DashboardStackScreens.Workouts)}>
            <Text style={styles.buttonText}>Weight Tracking</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Summary;
