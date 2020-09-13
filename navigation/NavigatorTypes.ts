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

export type WorkoutStackRouteParams = {
  WorkoutTypes: undefined;
  WorkoutSubTypes: {
    type: string;
  };
  Workoutlog: {
    type: string;
    subType: string;
  };
};

export enum WorkoutStackScreens {
  WorkoutTypesScreen = 'WorkoutTypes',
  WorkoutSubTypesScreen = 'WorkoutSubTypes',
  WorkoutlogScreen = 'Workoutlog',
}

export type ProfileStackRouteParams = {
  Profile: undefined;
  EditProfile: undefined;
};

export enum ProfileStackScreens {
  ProfileScreen = 'Profile',
  EditProfileScreen = 'EditProfile',
}
