// Copyright FitBook

import RNDeviceInfo from 'react-native-device-info';

export default class DeviceInfo {
  public static readonly DEVICE_ID: string = RNDeviceInfo.getUniqueId();
}
