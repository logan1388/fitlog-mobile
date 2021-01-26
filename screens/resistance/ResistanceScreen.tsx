import React, { useState } from 'react';
import { Text, View, SafeAreaView, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ResistanceStackRouteParams, ResistanceStackScreens } from '../../navigation/NavigatorTypes';
import { resistanceStyles } from './ResistanceScreen.style';
import mapping from '../../utils/assetmapping';

type ResistanceNavigationProps = StackNavigationProp<
  ResistanceStackRouteParams,
  ResistanceStackScreens.ResistanceScreen
>;

interface ResistanceProps {
  navigation: ResistanceNavigationProps;
}
interface ItemProps {
  title: string;
  empty: boolean;
}

const Resistance: React.FC<ResistanceProps> = props => {
  const [styles, setStyles] = useState(resistanceStyles());
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

  const Item: React.FC<ItemProps> = ({ title, empty }) => {
    if (empty === true) {
      return <View style={[styles.insideContainer, styles.itemInvisible]}></View>
    }
    return (
      <View style={styles.insideContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.navigation.navigate(ResistanceStackScreens.ResistancelogScreen, {
              exercise: title,
            })
          }>
          <Image style={styles.resistanceIcons} source={mapping(title)} />
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
            data={formatData(buttons, numColumns)}
            renderItem={({ item }) => <Item title={item.title} empty={item.empty} />}
            keyExtractor={item => item.title}
            numColumns={numColumns}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export const screenOptions = { headerTitle: 'Resistance' };

export default Resistance;
