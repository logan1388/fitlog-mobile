import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileStackRouteParams, ProfileStackScreens } from '../navigation/Navigator';
import { setTheme } from '../store/actions/actions';
import { styles } from './ProfileScreen.style';
import { ProfileModel } from '../commonlib/models/ProfileModel';
import { RootState } from '../store/actionHelpers';
import { fetchMyProfile } from '../store/profiles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ProfileReduxState {
  myProfile?: ProfileModel;
}

type ProfileNavigationProps = StackNavigationProp<ProfileStackRouteParams, ProfileStackScreens.ProfileScreen>;

interface ProfileProps {
  navigation: ProfileNavigationProps;
}

const Profile: React.FC<ProfileProps> = props => {
  const [isEnabled, setIsEnabled] = useState(false);
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const dispatch = useDispatch();
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    dispatch(setTheme(isEnabled ? 'light' : 'dark'));
  };
  const themeTextStyle = mode === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = mode === 'light' ? styles.lightContainer : styles.darkContainer;

  const profileReduxState = useSelector<RootState, ProfileReduxState>(state => {
    const myProfile = state.profiles.myProfile;
    return { myProfile };
  });

  React.useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  const onEditProfileClick = () => {
    props.navigation.navigate('EditProfile');
  };

  const { myProfile } = profileReduxState;
  const { firstName, lastName, weight, height } = myProfile || {};

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View style={[styles.innerContainer]}>
        <Text style={[styles.darkThemeText, themeTextStyle]}>Dark Theme</Text>
        <Switch
          trackColor={{ false: 'darkgrey', true: 'lightgrey' }}
          thumbColor={isEnabled ? 'steelblue' : '#f4f3f4'}
          ios_backgroundColor="darkgrey"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <TouchableOpacity onPress={onEditProfileClick}>
        <Text style={styles.editProfileButtonText}>Edit profile info</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>First name</Text>
          <Text style={styles.valueText}>{firstName}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>Last name</Text>
          <Text style={styles.valueText}>{lastName}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>Weight (in kg)</Text>
          <Text style={styles.valueText}>{weight}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>Height (in cms)</Text>
          <Text style={styles.valueText}>{height}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
