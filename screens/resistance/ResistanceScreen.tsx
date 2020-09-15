import React, { useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ResistanceStackRouteParams, ResistanceStackScreens } from '../../navigation/NavigatorTypes';
import { resistanceStyles } from './ResistanceScreen.style';

type ResistanceNavigationProps = StackNavigationProp<
  ResistanceStackRouteParams,
  ResistanceStackScreens.ResistanceScreen
>;

interface ResistanceProps {
  navigation: ResistanceNavigationProps;
}
interface ItemProps {
  title: string;
}

const Resistance: React.FC<ResistanceProps> = props => {
  const [styles, setStyles] = useState(resistanceStyles());

  React.useEffect(() => {
    setStyles(resistanceStyles());
  }, [setStyles]);

  const buttons = [
    { title: 'Pushup', workout: 'pushups' },
    { title: 'Pullup', workout: 'pullups' },
    { title: 'Dips', workout: 'dips' },
    { title: 'Burpee', workout: 'burpee' },
    { title: 'Plank', workout: 'plank' },
    { title: 'Lunges', workout: 'lunges' },
  ];

  const Item: React.FC<ItemProps> = ({ title }) => {
    return (
      <View style={styles.insideContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate(ResistanceStackScreens.ResistancelogScreen, {
              exercise: title,
            })
          }>
          <Text style={styles.buttonText}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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

export const screenOptions = { headerTitle: 'Resistance' };

export default Resistance;
