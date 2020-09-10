// Copyright FitBook

import { CreateResistanceModel, ResistanceModel } from '../../commonlib/models/ResistanceModel';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../constants/storage';
import ResistanceService from '../../commonlib/services/resistance';
import ServiceResponse from '../../commonlib/models/ServiceResponse';
import LocalStorageDB from '../database/localStorageDB';
import DeviceInfo from '../util/DeviceInfo';

export default class ResistanceController {
  private resistanceSvc: ResistanceService;
  private static readonly TABLE_NAME: string = 'profiles';

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

  public async addResistanceLog(data: CreateResistanceModel): Promise<ResistanceModel | ServiceResponse> {
    data.id = DeviceInfo.DEVICE_ID;

    const response = this.resistanceSvc.addResistance(data);
    return response;
  }

  public async getMyProfile(): Promise<ResistanceModel | ServiceResponse> {
    let id = await AsyncStorage.getItem(Storage.MY_PROFILE_ID);

    if (!id) {
      id = DeviceInfo.DEVICE_ID;
    }

    const response: ResistanceModel | ServiceResponse = await this.resistanceSvc.getResistance(id);
    return response;
  }
}

export const resistanceController = new ResistanceController();
