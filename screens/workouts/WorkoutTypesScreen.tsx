import React, { useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WorkoutStackRouteParams, WorkoutStackScreens } from '../../navigation/NavigatorTypes';
import { workoutStyles } from './WorkoutScreen.style';
import { WorkoutTypes } from '../../commonlib/models/WorkoutModel';

type WorkoutTypesNavigationProps = StackNavigationProp<WorkoutStackRouteParams, WorkoutStackScreens.WorkoutTypesScreen>;

interface WorkoutTypesProps {
  navigation: WorkoutTypesNavigationProps;
}

interface ItemProps {
  type: string;
}

const WorkoutTypesScreen: React.FC<WorkoutTypesProps> = props => {
  const workoutTypes: string[] = Object.keys(WorkoutTypes);

  const [styles, setStyles] = useState(workoutStyles());

  React.useEffect(() => {
    setStyles(workoutStyles());
  }, [setStyles]);

  const Item: React.FC<ItemProps> = ({ type }) => {
    return (
      <View style={styles.workoutTypesContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate(WorkoutStackScreens.WorkoutSubTypesScreen, {
              type,
            });
          }}>
          <Text style={styles.buttonText}>{type}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImageBackground source={require('../../assets/FITLOG.jpg')} style={styles.image}>
        <View style={styles.bg}>
          <FlatList data={workoutTypes} renderItem={({ item }) => <Item type={item} />} keyExtractor={item => item} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export const screenOptions = { headerTitle: 'Workouts' };

export default WorkoutTypesScreen;
