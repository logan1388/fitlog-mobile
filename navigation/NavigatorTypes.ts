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

export enum WorkoutSubTypeStackScreens {
  ExerciseScreen = 'Exercise',
  GraphScreen = 'Graph',
}

export type WorkoutSubTypeStackRouteParams = {
  Exercise: {
    type: string;
    subType: string;
  };
  Graph: undefined;
};

export interface ExerciseTabNavigatorParams {
  route: {
    params: {
      type: string;
      subType: string;
    };
  };
}

export type ProfileStackRouteParams = {
  Profile: undefined;
  EditProfile: undefined;
};

export enum ProfileStackScreens {
  ProfileScreen = 'Profile',
  EditProfileScreen = 'EditProfile',
}

export type DashboardStackRouteParams = {
  Dashboard: undefined;
  Workouts: undefined;
  Resistance: undefined;
};

export enum DashboardStackScreens {
  Dashboard = 'Dashboard',
  Workouts = 'Workouts',
  Resistance = 'Resistance',
}
