// Copyright FitBook

export enum WorkoutTypes {
  CHEST = 'CHEST',
  LEG = 'LEG',
  SHOULDER = 'SHOULDER',
  BACK = 'BACK',
  BICEPS = 'BICEPS',
  TRICEPS = 'TRICEPS',
}

// export interface WorkoutSubTypes {
//   type: WorkoutTypes;
//   exercise: string;
// }

export interface CreateWorkoutModel {
  userId: string;
  type: WorkoutTypes;
  subType: string;
  date: Date;
  weight?: number;
  unit?: string;
  count?: number;
  note?: string;
}

export interface WorkoutModel {
  _id: string;
  userId: string;
  type: WorkoutTypes;
  subType: string;
  date: Date;
  weight: number;
  unit: string;
  count: number;
  note: string;
}

export const getWorkoutType = (param: string): WorkoutTypes => {
  switch (param.toLocaleUpperCase()) {
    case 'CHEST':
      return WorkoutTypes.CHEST;
    case 'LEG':
      return WorkoutTypes.LEG;
    case 'SHOULDER':
      return WorkoutTypes.SHOULDER;
    case 'BACK':
      return WorkoutTypes.BACK;
    case 'BICEPS':
      return WorkoutTypes.BICEPS;
    case 'TRICEPS':
      return WorkoutTypes.TRICEPS;
    default:
      return WorkoutTypes.CHEST;
  }
};
