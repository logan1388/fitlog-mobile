// Copyright FitBook

export enum ResistanceTypes {
  PUSH_UP = 'pushup',
  PULL_UP = 'pullup',
  DIPS = 'dips',
  BURPEE = 'burpee',
  PLANK = 'plank',
  LUNGES = 'lunges',
}

export interface CreateResistanceModel {
  userId: string;
  type: ResistanceTypes;
  createdDate: Date;
  weight?: number;
  unit?: string;
  count?: number;
  time?: string;
  note?: string;
}

export interface ResistanceModel {
  _id: string;
  userId: string;
  type: ResistanceTypes;
  createdDate: Date;
  weight: number;
  unit: string;
  count: number;
  time: string;
  note: string;
}
