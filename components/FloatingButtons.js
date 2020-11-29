import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { dashboardStyles } from '../screens/dashboard/DashboardScreen.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const FloatingButtons = props => {
  const mode = useSelector(state => state.fitlogReducer.theme);
  const [styles, setStyles] = useState(dashboardStyles());
  const animation = useRef(new Animated.Value(0)).current;
  const themeButtonStyle = mode === 'light' ? '#343a40' : 'deepskyblue';
  const floatBtn = props.floatBtn;

  const toggleAddMenu = () => {
    const toValue = floatBtn ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    props.setFloatBtn(!floatBtn);
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const workoutBtnStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -5],
        }),
      },
    ],
  };

  const resistanceBtnStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -5, -15],
        }),
      },
    ],
  };

  const addWorkoutLog = () => {
    props.setWorkoutInputModalVisible(!props.workoutInputModalVisible);
    toggleAddMenu();
  };

  const addResistanceLog = () => {
    props.setResistanceInputModalVisible(!props.resistanceInputModalVisible);
    toggleAddMenu();
  };

  React.useEffect(() => {
    setStyles(dashboardStyles());
  }, [setStyles]);

  return (
    <View style={styles.floatingButtonContainer}>
      <TouchableOpacity onPress={addResistanceLog}>
        <Animated.View style={[styles.secondaryButton, resistanceBtnStyle, props.floatBtn ? { display: 'flex' } : { display: 'none' }]}>
          <Text>Resistance</Text>
          <Icon name="yoga" size={35} color={themeButtonStyle} style={{ paddingHorizontal: 5 }} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={addWorkoutLog}>
        <Animated.View style={[styles.secondaryButton, workoutBtnStyle, props.floatBtn ? { display: 'flex' } : { display: 'none' }]}>
          <Text>Workout</Text>
          <Icon name="dumbbell" size={35} color={themeButtonStyle} style={{ paddingHorizontal: 5 }} />
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleAddMenu}>
        <Animated.View style={[styles.floatingButton, rotation]}>
          <Icon name="plus-circle" size={60} color={themeButtonStyle} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingButtons;
