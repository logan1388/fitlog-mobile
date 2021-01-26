// Copyright FitBook

export enum WorkoutTypes {
  CHEST = 'chest',
  LEG = 'leg',
  SHOULDER = 'shoulder',
  BACK = 'back',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
}

export interface CreateWorkoutModel {
  userId: string;
  type: WorkoutTypes;
  subType: string;
  createdDate: Date;
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
  createdDate: Date;
  date: string;
  weight: number;
  unit: string;
  count: number;
  time: string;
  note: string;
}

export interface WorkoutHistoryModel {
  _id: string;
  userId: string;
  type: WorkoutTypes;
  createdDate: Date;
}

export interface WorkoutSummaryModel {
  _id: string;
  userId: string;
  subType: string;
  createdDate: Date;
  weight: number;
  unit: string;
  count: number;
}

export interface WorkoutHistoryGraphModel {
  type: WorkoutTypes;
  frequency: number;
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

export const SubWorkoutTypes = [
  {
    type: 'chest',
    subtypes: ['bench press', 'incline press', 'decline press', 'pec deck', 'pull over'],
  },
  {
    type: 'leg',
    subtypes: [
      'squat',
      'squat & press',
      'static lunge',
      'walking lunge',
      'leg press',
      'harmstring curl',
      'leg extension',
    ],
  },
  {
    type: 'shoulder',
    subtypes: ['shoulder press', 'reverse fly', 'side rise', 'dumbbell shrug', 'barbell shrug'],
  },
  {
    type: 'back',
    subtypes: ['deadlift', 't-bar row', 'cable row'],
  },
  {
    type: 'biceps',
    subtypes: ['biceps curl', 'hammer curl', 'incline biceps curl', 'ez-bar preacher curl'],
  },
  {
    type: 'triceps',
    subtypes: ['skullcrusher', 'kickback', 'triceps extension', 'rope triceps pressdown'],
  },
];
