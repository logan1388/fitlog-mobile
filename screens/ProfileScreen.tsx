import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ProfileStackRouteParams, ProfileStackScreens } from '../navigation/Navigator';
import { setTheme } from '../store/actions/actions';
import { profileStyles } from './ProfileScreen.style';
import { ProfileModel } from '../commonlib/models/ProfileModel';
import { RootState } from '../store/actionHelpers';
import { fetchMyProfile } from '../store/profiles';
import { Style, ThemeName } from '../styles/style';

interface ProfileReduxState {
  myProfile?: ProfileModel;
}

type ProfileNavigationProps = StackNavigationProp<ProfileStackRouteParams, ProfileStackScreens.ProfileScreen>;

interface ProfileProps {
  navigation: ProfileNavigationProps;
}

const Profile: React.FC<ProfileProps> = props => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [styles, setStyles] = useState(profileStyles());

  const currentTheme = useSelector<RootState>(state => state.fitlogReducer.theme);
  const dispatch = useDispatch();

  const toggleSwitch = async (value: boolean) => {
    await Style.setCurrentTheme(value ? ThemeName.DARK : ThemeName.LIGHT);
    dispatch(setTheme(value ? ThemeName.DARK : ThemeName.LIGHT));
  };

  React.useEffect(() => {
    setIsDarkMode(currentTheme === ThemeName.DARK);
    setStyles(profileStyles());
  }, [setIsDarkMode, setStyles, currentTheme]);

  const themeTextStyle = currentTheme === ThemeName.LIGHT ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = currentTheme === ThemeName.LIGHT ? styles.lightContainer : styles.darkContainer;

  const profileReduxState = useSelector<RootState, ProfileReduxState>(state => {
    const myProfile = state.profiles.myProfile;
    return { myProfile };
  });

  React.useEffect(() => {
    dispatch(fetchMyProfile());
  }, [dispatch]);

  const onEditProfileClick = () => {
    props.navigation.navigate(ProfileStackScreens.EditProfileScreen);
  };

  const { myProfile } = profileReduxState;
  const { firstName, lastName, weight, height } = myProfile || {};

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <View style={[styles.innerContainer]}>
        <Text style={[styles.darkThemeText, themeTextStyle]}>{t('profile.darkThemeToggle')}</Text>
        <Switch
          trackColor={{ false: 'darkgrey', true: 'lightgrey' }}
          thumbColor={isDarkMode ? 'steelblue' : '#f4f3f4'}
          ios_backgroundColor="darkgrey"
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
      </View>
      <TouchableOpacity onPress={onEditProfileClick}>
        <Text style={styles.editProfileButtonText}>{t('profile.editProfileButton')}</Text>
      </TouchableOpacity>
      <View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.firstNameLabel')}</Text>
          <Text style={styles.valueText}>{firstName}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.lastNameLabel')}</Text>
          <Text style={styles.valueText}>{lastName}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.weightLabel')}</Text>
          <Text style={styles.valueText}>{weight}</Text>
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.heightLabel')}</Text>
          <Text style={styles.valueText}>{height}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;
