import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = props => {
  return <View style={{ ...styles.container, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 6,
    shadowOpacity: 0.8,
    elevation: 8,
    backgroundColor: 'white',
    padding: 30,
  },
});

export default Card;
