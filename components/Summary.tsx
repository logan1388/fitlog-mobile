import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { WorkoutSummaryModel } from '../commonlib/models/WorkoutModel';
import { dashboardStyles } from '../screens/dashboard/DashboardScreen.style';
import { RootState } from '../store/actionHelpers';
import Card from './Card';

interface SummaryProps {
  workoutsSummary: WorkoutSummaryModel[];
}

const Summary: React.FC<SummaryProps> = props => {
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(dashboardStyles());
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  React.useEffect(() => {
    setStyles(dashboardStyles());
  }, [setStyles]);

  const todaySummary = props.workoutsSummary && props.workoutsSummary.length > 0 && (
    <View style={styles.summaryContainer}>
      <ScrollView>
        {props.workoutsSummary.map(item => (
          <View style={styles.logs} key={item._id}>
            <View style={styles.summarySubTypeTextContainer}>
              <Text>{item.subType}</Text>
            </View>
            <View style={styles.summaryWeightTextContainer}>
              <Text style={styles.summaryWeightText}>
                {item.weight} {item.unit}
              </Text>
            </View>
            <View style={styles.summaryRepsTextContainer}>
              <Text style={styles.summaryRepsText}>{item.count} reps</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.summaryContainer}>
      <Text style={[styles.text, themeTextStyle]}>Today's Summary</Text>
      <Card style={styles.card}>{todaySummary}</Card>
    </View>
  );
};

export default Summary;
