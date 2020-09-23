import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { workoutHistory, workoutSummary, weeklyAwards } from '../../store/actions/actions';
import Card from '../../components/Card';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { VictoryPie } from 'victory-native';
import Colors from '../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackScreens, DashboardStackRouteParams } from '../../navigation/NavigatorTypes';
import { dashboardStyles } from './DashboardScreen.style';
import { RootState } from '../../store/actionHelpers';
import History from '../../components/History';
import Summary from '../../components/Summary';

type DashboardNavigationProps = StackNavigationProp<DashboardStackRouteParams, DashboardStackScreens>;

interface DashboardProps {
  navigation: DashboardNavigationProps;
}

const DashboardScreen: React.FC<DashboardProps> = props => {
  const workoutHist = useSelector<RootState>(state => state.fitlogReducer.workoutHistory);
  const workoutSumm = useSelector<RootState>(state => state.fitlogReducer.workoutSummary);
  const awardsSumm = useSelector<RootState>(state => state.fitlogReducer.awardsWeek);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(dashboardStyles());
  const dispatch = useDispatch();
  const userId = '5dfecbdd39d8760019968d04';
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;

  React.useEffect(() => {
    dispatch(workoutSummary(userId));
    dispatch(workoutHistory(userId));
    dispatch(weeklyAwards(userId));
    setStyles(dashboardStyles());
  }, [dispatch, setStyles]);

  const graphData = {};
  const data = [];
  workoutHist.map(hist => {
    graphData[hist.category] = {
      count: graphData[hist.category] ? graphData[hist.category].count + 1 : 1,
    };
  });
  Object.keys(graphData).map(key => {
    data.push({
      x: key,
      y: graphData[key].count,
      label: `${key}\n(${graphData[key].count})`,
    });
  });

  const hightlights = (
    <View style={{ width: '100%' }}>
      <ScrollView>
        {awardsSumm.length > 0 ? (
          awardsSumm.map(item => (
            <View style={{ flexDirection: 'row', paddingBottom: 10 }} key={item.date}>
              <View style={{ flex: 1 }}>
                <Icon name="dumbbell" size={25} color={Colors.headerBackground} />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={{ fontSize: 16 }}>{item.name}</Text>
              </View>
              <View style={{ flex: 1.5 }}>
                <Text style={{ textAlign: 'right' }}>{item.weight > 0 && `${item.weight} ${item.unit}`}</Text>
              </View>
              <View style={{ flex: 1.5 }}>
                <Text style={{ textAlign: 'right' }}>{item.count} reps</Text>
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
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <ScrollView style={[styles.container, themeContainerStyle]}>
        <View style={styles.innerContainer}>
          <Summary workoutSummary={workoutSumm} />
          <View style={styles.trackingButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => props.navigation.navigate(DashboardStackScreens.Resistance)}>
              <Text style={styles.buttonText}>Resistance Tracking</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
            <History />
            <View style={{ width: '100%', marginTop: 20 }}>
              <Text style={[styles.text, themeTextStyle]}>Highlights</Text>
              <Card style={styles.card}>{hightlights}</Card>
            </View>
            <View style={{ marginTop: 15 }}>
              <VictoryPie data={data} width={350} colorScale="blue" style={{ labels: { fontSize: 16 } }} />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const screenOptions = {
  headerTitle: 'FITBOOK',
};

export default DashboardScreen;
