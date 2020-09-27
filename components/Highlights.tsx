import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import { WorkoutSummaryModel } from '../commonlib/models/WorkoutModel';
import { dashboardStyles } from '../screens/dashboard/DashboardScreen.style';
import { RootState } from '../store/actionHelpers';
import Card from './Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/colors';

interface HighlightsProps {
  awards: WorkoutSummaryModel[];
}

const Highlights: React.FC<HighlightsProps> = props => {
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(dashboardStyles());
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;

  React.useEffect(() => {
    setStyles(dashboardStyles());
  }, [setStyles]);

  const hightlights = (
    <View style={styles.highlightsContainer}>
      <ScrollView>
        {props.awards.length > 0 ? (
          props.awards.map(item => (
            <View style={styles.highlightsRowContainer} key={item._id}>
              <View style={styles.highlightsIconContainer}>
                <Icon name="dumbbell" size={25} color={Colors.headerBackground} />
              </View>
              <View style={styles.highlightsSubTypeContainer}>
                <Text style={{ fontSize: 16 }}>{item.subType}</Text>
              </View>
              <View style={styles.highlightsWeightContainer}>
                <Text style={styles.highlightsWeightText}>{item.weight > 0 && `${item.weight} ${item.unit}`}</Text>
              </View>
              <View style={styles.highlightsRepsContainer}>
                <Text style={styles.highlightsRepsText}>{item.count} reps</Text>
              </View>
            </View>
          ))
        ) : (
            <View style={{ alignItems: 'center' }}>
              <Text>Keep pushing hard!</Text>
            </View>
          )}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.highlightsCardContainer}>
      <Text style={[styles.text, themeTextStyle]}>Highlights</Text>
      <Card style={styles.card}>{hightlights}</Card>
    </View>
  );
};

export default Highlights;
