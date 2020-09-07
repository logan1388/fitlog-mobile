// Copyright FitBook

import { CreateProfileModel, ProfileModel } from '../../commonlib/models/ProfileModel';
import AsyncStorage from '@react-native-community/async-storage';
import Storage from '../../constants/storage';
import ProfilesService from '../../commonlib/services/profiles';
import ServiceResponse from '../../commonlib/models/ServiceResponse';
import LocalStorageDB from '../database/localStorageDB';
import DeviceInfo from '../util/DeviceInfo';

export default class ProfilesController {
  private profileSvc: ProfilesService;
  private static readonly TABLE_NAME: string = 'profiles';

  constructor() {
    this.profileSvc = new ProfilesService(new LocalStorageDB(ProfilesController.TABLE_NAME));
    this.initialize();
  }

  public async initialize() {
    let allowRemoteStorage = false;
    AsyncStorage.getItem(Storage.ALLOW_REMOTE_STORAGE).then(value => {
      if (value) {
        allowRemoteStorage = !!value;
      }

      this.profileSvc = allowRemoteStorage
        ? new ProfilesService(new LocalStorageDB(ProfilesController.TABLE_NAME))
        : new ProfilesService(new LocalStorageDB(ProfilesController.TABLE_NAME));
    });
  }

  public async saveProfileInfo(data: CreateProfileModel): Promise<ProfileModel | ServiceResponse> {
    data.id = DeviceInfo.DEVICE_ID;

    const response = this.profileSvc.createProfile(data);
    return response;
  }

  public async getMyProfile(): Promise<ProfileModel | ServiceResponse> {
    let id = await AsyncStorage.getItem(Storage.MY_PROFILE_ID);

    if (!id) {
      id = DeviceInfo.DEVICE_ID;
    }

    const response: ProfileModel | ServiceResponse = await this.profileSvc.getMyProfile(id);
    return response;
  }
}

export const profileController = new ProfilesController();
