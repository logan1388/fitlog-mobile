// Copyright FitBook

export type ResistanceStackRouteParams = {
  Resistance: undefined;
  Resistancelog: {
    exercise: string;
  };
};

export enum ResistanceStackScreens {
  ResistanceScreen = 'Resistance',
  ResistancelogScreen = 'Resistancelog',
}

export type ProfileStackRouteParams = {
  Profile: undefined;
  EditProfile: undefined;
};

export enum ProfileStackScreens {
  ProfileScreen = 'Profile',
  EditProfileScreen = 'EditProfile',
}
