import React, { useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WorkoutStackRouteParams, WorkoutStackScreens } from '../../navigation/Navigator';
import { workoutStyles } from './WorkoutScreen.style';

type WorkoutTypesNavigationProps = StackNavigationProp<WorkoutStackRouteParams, WorkoutStackScreens.WorkoutTypesScreen>;

interface WorkoutTypesProps {
  navigation: WorkoutTypesNavigationProps;
}

interface ItemProps {
  title: string;
}

const WorkoutTypesScreen: React.FC<WorkoutTypesProps> = props => {
  const buttons = [
    { title: 'Chest', workout: 'chest' },
    { title: 'Leg', workout: 'legs' },
    { title: 'Shoulder', workout: 'shoulder' },
    { title: 'Back', workout: 'back' },
    { title: 'Biceps', workout: 'biceps' },
    { title: 'Triceps', workout: 'triceps' },
  ];
  const [styles, setStyles] = useState(workoutStyles());

  React.useEffect(() => {
    setStyles(workoutStyles());
  }, [setStyles]);

  const Item: React.FC<ItemProps> = ({ title }) => {
    return (
      <View style={styles.workoutTypesContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate(WorkoutStackScreens.WorkoutSubTypesScreen, {
              type: title,
            });
          }}>
          <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.outerContainer}>
      <ImageBackground source={require('../../assets/FITLOG.jpg')} style={styles.image}>
        <View style={styles.bg}>
          <FlatList
            data={buttons}
            renderItem={({ item }) => <Item title={item.title} />}
            keyExtractor={item => item.title}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export const screenOptions = { headerTitle: 'Workouts' };

export default WorkoutTypesScreen;
