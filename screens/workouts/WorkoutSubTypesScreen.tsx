import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WorkoutStackRouteParams, WorkoutStackScreens } from '../../navigation/NavigatorTypes';
import { fetchExercises } from '../../store/actions/actions';
import { useRoute, RouteProp } from '@react-navigation/native';
import { workoutStyles } from './WorkoutScreen.style';
import { RootState } from '../../store/actionHelpers';

type WorkoutNavigationProps = StackNavigationProp<WorkoutStackRouteParams, WorkoutStackScreens.WorkoutSubTypesScreen>;

interface WorkoutProps {
  navigation: WorkoutNavigationProps;
}

interface ItemProps {
  type: string;
  subType: string;
}

const WorkoutSubTypesScreen: React.FC<WorkoutProps> = props => {
  const route = useRoute<RouteProp<WorkoutStackRouteParams, WorkoutStackScreens.WorkoutSubTypesScreen>>();
  const selectedWorkout = route.params && route.params.type;
  const workouts = useSelector<RootState>(state => state.fitlogReducer.workouts);
  const [styles, setStyles] = useState(workoutStyles());
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchExercises(selectedWorkout));
    setStyles(workoutStyles());
  }, [dispatch, selectedWorkout, setStyles]);

  const Item: React.FC<ItemProps> = ({ type, subType }) => {
    return (
      <View style={styles.workoutSubTypesContainer}>
        {type.toLowerCase() === selectedWorkout.toLowerCase() ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.navigate(WorkoutStackScreens.WorkoutlogScreen, {
                type,
                subType,
              });
            }}>
            <Text style={styles.buttonText}>{subType}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImageBackground source={require('../../assets/FITLOG.jpg')} style={styles.image}>
        <View style={styles.bg}>
          <FlatList
            style={styles.innerContainer}
            data={workouts}
            renderItem={({ item }) => <Item type={item.category} subType={item.name} />}
            keyExtractor={item => item.name}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export const screenOptions = (navigationData: any) => {
  return {
    headerTitle: navigationData.route.params.type,
  };
};

export default WorkoutSubTypesScreen;
