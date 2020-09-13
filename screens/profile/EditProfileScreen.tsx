// Copyright FitBook

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ProfileStackRouteParams, ProfileStackScreens } from '../../navigation/NavigatorTypes';
import { profileStyles } from './ProfileScreen.style';
import { CreateProfileModel, ProfileModel } from '../../commonlib/models/ProfileModel';
import { RootState } from '../../store/actionHelpers';
import { updateMyProfile, fetchMyProfile } from '../../store/profiles';
import { ThemeName } from '../../styles/style';

interface EditProfileReduxState {
  myProfile?: ProfileModel;
}

type EditProfileNavigationProps = StackNavigationProp<ProfileStackRouteParams, ProfileStackScreens.EditProfileScreen>;

interface EditProfileProps {
  navigation: EditProfileNavigationProps;
}

const EditProfile: React.FC<EditProfileProps> = props => {
  const { t } = useTranslation();
  const mode = useSelector<RootState>(state => state.fitlogReducer.theme);
  const dispatch = useDispatch();
  const currentTheme = useSelector<RootState>(state => state.fitlogReducer.theme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [styles, setStyles] = useState(profileStyles());

  const themeContainerStyle = currentTheme === ThemeName.LIGHT ? styles.lightContainer : styles.darkContainer;

  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [weight, setWeight] = React.useState<Number>(0);
  const [height, setHeight] = React.useState<Number>(0);

  const profileReduxState = useSelector<RootState, EditProfileReduxState>(state => {
    const profile = state.profiles.myProfile;
    return { myProfile: profile };
  });

  React.useEffect(() => {
    setIsDarkMode(currentTheme === ThemeName.DARK);
    setStyles(profileStyles());
    dispatch(fetchMyProfile());
  }, [setIsDarkMode, setStyles, currentTheme, dispatch]);

  const { myProfile } = profileReduxState;

  React.useEffect(() => {
    if (myProfile) {
      setFirstName(myProfile.firstName);
      setLastName(myProfile.lastName);
      setWeight(myProfile.weight);
      setHeight(myProfile.height);
    }
  }, [myProfile]);

  const onSuccess = () => {
    props.navigation.navigate(ProfileStackScreens.ProfileScreen);
  };

  const onSaveClick = () => {
    const profile: CreateProfileModel = {
      id: '',
      firstName,
      lastName,
      weight,
      height,
    };

    dispatch(updateMyProfile(profile, onSuccess));
  };

  return (
    <View style={[styles.container, styles.editProfileContainer, themeContainerStyle]}>
      <View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.firstNameLabel')}</Text>
          <TextInput
            placeholder={t('profile.firstNameLabel')}
            style={styles.valueText}
            defaultValue={firstName}
            onChangeText={(value: string) => setFirstName(value)}
          />
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.lastNameLabel')}</Text>
          <TextInput
            placeholder={t('profile.lastNameLabel')}
            style={styles.valueText}
            defaultValue={lastName}
            onChangeText={(value: string) => setLastName(value)}
          />
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.weightLabel')}</Text>
          <TextInput
            placeholder={t('profile.weightLabel')}
            style={styles.valueText}
            defaultValue={weight > 0 ? weight.toString() : undefined}
            onChangeText={(value: string) => setWeight(Number(value))}
          />
        </View>
        <View style={styles.dataView}>
          <Text style={styles.labelText}>{t('profile.heightLabel')}</Text>
          <TextInput
            placeholder={t('profile.heightLabel')}
            style={styles.valueText}
            defaultValue={height > 0 ? height.toString() : undefined}
            onChangeText={(value: string) => setHeight(Number(value))}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onSaveClick}>
          <Text>{t('profile.saveButton')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;
