import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WorkoutStackRouteParams, WorkoutStackScreens } from '../../navigation/NavigatorTypes';
import { fetchExercises } from '../../store/actions/actions';
import { useRoute, RouteProp } from '@react-navigation/native';
import { workoutStyles } from './WorkoutScreen.style';
import { RootState } from '../../store/actionHelpers';
import mapping from '../../utils/assetmapping';

type WorkoutNavigationProps = StackNavigationProp<WorkoutStackRouteParams, WorkoutStackScreens.WorkoutSubTypesScreen>;

interface WorkoutProps {
  navigation: WorkoutNavigationProps;
}

interface ItemProps {
  type: string;
  subType: string;
  empty: boolean;
}

const WorkoutSubTypesScreen: React.FC<WorkoutProps> = props => {
  const route = useRoute<RouteProp<WorkoutStackRouteParams, WorkoutStackScreens.WorkoutSubTypesScreen>>();
  const selectedWorkout = route.params && route.params.type;
  const workouts = useSelector<RootState>(state => state.fitlogReducer.workouts);
  const [styles, setStyles] = useState(workoutStyles());
  const dispatch = useDispatch();
  const numColumns = 2;

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow += 1;
    }
    return data;
  }

  React.useEffect(() => {
    dispatch(fetchExercises(selectedWorkout));
    setStyles(workoutStyles());
  }, [dispatch, selectedWorkout, setStyles]);

  const Item: React.FC<ItemProps> = ({ type, subType, empty }) => {
    if (empty === true) {
      return <View style={[styles.workoutSubTypesContainer, styles.itemInvisible]}></View>
    }
    return (
      <View style={styles.workoutSubTypesContainer}>
        {type.toLowerCase() === selectedWorkout.toLowerCase() ? (
          <TouchableOpacity
            style={styles.subtypesButton}
            onPress={() => {
              props.navigation.navigate(WorkoutStackScreens.WorkoutlogScreen, {
                type,
                subType,
              });
            }}>
            <Image style={styles.workoutSubTypeIcons} source={mapping(subType)} />
            <Text style={styles.buttonText}>{subType}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      {/* <ImageBackground source={require('../../assets/FITLOG.jpg')} style={styles.image}> */}
      <View style={styles.bg}>
        <FlatList
          data={formatData(workouts, numColumns)}
          renderItem={({ item }) => <Item type={item.category} subType={item.name} empty={item.empty} />}
          keyExtractor={item => item.name}
          numColumns={numColumns}
        />
      </View>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export const screenOptions = (navigationData: any) => {
  return {
    headerTitle: navigationData.route.params.type,
  };
};

export default WorkoutSubTypesScreen;
