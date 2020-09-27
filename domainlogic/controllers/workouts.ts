// Copyright FitBook

import {
  CreateWorkoutModel,
  WorkoutHistoryModel,
  WorkoutModel,
  WorkoutSummaryModel,
  WorkoutTypes,
} from '../../commonlib/models/WorkoutModel';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../constants/storage';
import WorkoutsService from '../../commonlib/services/workouts';
import ServiceResponse from '../../commonlib/models/ServiceResponse';
import LocalStorageDB from '../database/localStorageDB';
import MongoDB from '../database/mongoDb';

export default class WorkoutsController {
  private workoutsSvc: WorkoutsService;
  private workoutsHistorySvc: WorkoutsService;
  private workoutsSummarySvc: WorkoutsService;
  private static readonly TABLE_NAME: string = 'workouts';
  private static readonly ENDPOINT = '/api/workout';

  constructor() {
    this.workoutsSvc = new WorkoutsService(new LocalStorageDB(WorkoutsController.TABLE_NAME));
    this.workoutsHistorySvc = new WorkoutsService(new LocalStorageDB(WorkoutsController.TABLE_NAME));
    this.workoutsSummarySvc = new WorkoutsService(new LocalStorageDB(WorkoutsController.TABLE_NAME));
    this.initialize();
  }

  public async initialize() {
    let allowRemoteStorage = false;
    AsyncStorage.getItem(Storage.ALLOW_REMOTE_STORAGE).then(value => {
      if (value) {
        allowRemoteStorage = !!value;
      }

      this.workoutsSvc = allowRemoteStorage
        ? new WorkoutsService(new MongoDB(WorkoutsController.ENDPOINT))
        : new WorkoutsService(new LocalStorageDB(WorkoutsController.TABLE_NAME));

      this.workoutsHistorySvc = allowRemoteStorage
        ? new WorkoutsService(new MongoDB(`${WorkoutsController.ENDPOINT}/workoutHistory`))
        : new WorkoutsService(new LocalStorageDB(WorkoutsController.TABLE_NAME));

      this.workoutsSummarySvc = allowRemoteStorage
        ? new WorkoutsService(new MongoDB(`${WorkoutsController.ENDPOINT}/workoutSummary`))
        : new WorkoutsService(new LocalStorageDB(WorkoutsController.TABLE_NAME));
    });
  }

  public async createWorkout(data: CreateWorkoutModel): Promise<WorkoutModel | ServiceResponse> {
    const response = await this.workoutsSvc.createWorkout(data);
    return response;
  }

  public async getWorkoutsList(
    type: WorkoutTypes,
    subType: string,
    userId: string
  ): Promise<WorkoutModel[] | ServiceResponse> {
    const response: WorkoutModel[] | ServiceResponse = await this.workoutsSvc.getWorkoutsListByUserId(
      type,
      subType,
      userId
    );
    return response;
  }

  public async getWorkoutsHistory(userId: string): Promise<WorkoutHistoryModel[] | ServiceResponse> {
    const response: WorkoutHistoryModel[] | ServiceResponse = await this.workoutsHistorySvc.getWorkoutsHistoryByUserId(
      userId
    );
    return response;
  }

  public async getWorkoutsSummary(userId: string): Promise<WorkoutSummaryModel[] | ServiceResponse> {
    const response: WorkoutSummaryModel[] | ServiceResponse = await this.workoutsSummarySvc.getWorkoutsSummaryByUserId(
      userId
    );
    return response;
  }
}

export const workoutsController = new WorkoutsController();
