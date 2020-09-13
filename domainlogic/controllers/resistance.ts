// Copyright FitBook

import { CreateResistanceModel, ResistanceModel, ResistanceTypes } from '../../commonlib/models/ResistanceModel';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../constants/storage';
import ResistanceService from '../../commonlib/services/resistance';
import ServiceResponse from '../../commonlib/models/ServiceResponse';
import LocalStorageDB from '../database/localStorageDB';

export default class ResistanceController {
  private resistanceSvc: ResistanceService;
  private static readonly TABLE_NAME: string = 'resistance';

  constructor() {
    this.resistanceSvc = new ResistanceService(new LocalStorageDB(ResistanceController.TABLE_NAME));
    this.initialize();
  }

  public async initialize() {
    let allowRemoteStorage = false;
    AsyncStorage.getItem(Storage.ALLOW_REMOTE_STORAGE).then(value => {
      if (value) {
        allowRemoteStorage = !!value;
      }

      this.resistanceSvc = allowRemoteStorage
        ? new ResistanceService(new LocalStorageDB(ResistanceController.TABLE_NAME))
        : new ResistanceService(new LocalStorageDB(ResistanceController.TABLE_NAME));
    });
  }

  public async createResistance(data: CreateResistanceModel): Promise<ResistanceModel | ServiceResponse> {
    const response = await this.resistanceSvc.createResistance(data);

    return response;
  }

  public async getResistanceList(type: ResistanceTypes, userId: string): Promise<ResistanceModel[] | ServiceResponse> {
    const response: ResistanceModel[] | ServiceResponse = await this.resistanceSvc.getResistanceListByUserId(
      type,
      userId
    );

    return response;
  }
}

export const resistanceController = new ResistanceController();
